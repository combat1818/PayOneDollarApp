const express = require('express');
const connectDB = require('./config/db');
const stripe = require('stripe')(
  'sk_test_51H3hcfFpBVvbcBPMUnf0gm1npKpzpCLT6zqNggFhj04zh1rwuePtdCwZiob6lWNbRPNZQl20YoOIbzOvDfXCH29Z00B0GxAblu'
);
const path = require('path');

const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/id', async (req, res) => {
  //console.log('params ' + req.query.price);
  const price = req.query.price;
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
    success_url: 'http://localhost:3000/dashboard',
    cancel_url: 'http://localhost:3000/dashboard',
  });
  console.log(session.id);
  res.json({ session_id: session.id }); // ... Fetch or create the Checkout Session
});

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
