const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const stripe = require('stripe')(
  'sk_test_51H3hcfFpBVvbcBPMUnf0gm1npKpzpCLT6zqNggFhj04zh1rwuePtdCwZiob6lWNbRPNZQl20YoOIbzOvDfXCH29Z00B0GxAblu'
);
const endpointSecret = 'whsec_O5QS8sZCjkMXJUPIOXjjmCHVq4hUkumP';

const path = require('path');
const User = require('./models/User');
const checkoutCompletePath = process.env.PORT
  ? 'https://pay-one-dollar.herokuapp.com/dashboard'
  : 'http://localhost:3000/dashboard';

const app = express();

//Connect Database
connectDB();

// only use the raw bodyParser for webhooks
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    console.log('info od stripa');
    next();
  } else {
    console.log('inne info');
    bodyParser.json()(req, res, next);
  }
});

// Init Middleware - parser JSONA- uzywa go traversyMedia - u góry zastąpione warunkowym parserem
//app.use(express.json({ extended: false }));

app.get('/id', async (req, res) => {
  //console.log('params ' + req.query.price);
  const price = req.query.price;
  const userEmail = req.query.user;
  const membership = price == 1 ? 1 : price == 10 ? 2 : 3;
  console.log('email ktory dotarl do serwera:' + userEmail);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: '3 Day Access',
          },
          unit_amount: 100 * price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: checkoutCompletePath,
    cancel_url: checkoutCompletePath,
    metadata: {
      email: userEmail,
      membership: membership,
    },
  });
  console.log(session);

  res.json({ session_id: session.id }); // ... Fetch or create the Checkout Session
});

// Zeby zadzialalo middleware z bodyParser.raw musimy nie uzywac innego middleware parsera! zeby otworzyc porty uzywamy ngroka
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Fulfill the purchase...

      const email = session.metadata.email;
      const membership = session.metadata.membership;
      try {
        let user = await User.findOne({ email });
        user.membership = membership;
        user.date = Date.now();
        user.save();
      } catch (err) {
        res.status(500).send('Server error');
      }
    }
    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
