/*
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51H3hcfFpBVvbcBPMhlx1mkaWDx8UKZo2y0gwCQHvNexQhSV98bIrYvHVgV8uGmJXwDoO97SR4Lvmttp0Kzw5VE1d00340CRzrP'
);

function Pricing() {
  const handleClick = async (event) => {
    // Call your backend to create the Checkout Session—see previous step
    const response = await axios.get('/id');
    const sessionId = response.data.session_id;
    console.log(response.data.session_id);
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    console.log(error.message);
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <button role='link' onClick={handleClick}>
      Checkout
    </button>
  );
}

export default Pricing;
*/

// React + Stripe
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Material UI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51H3hcfFpBVvbcBPMhlx1mkaWDx8UKZo2y0gwCQHvNexQhSV98bIrYvHVgV8uGmJXwDoO97SR4Lvmttp0Kzw5VE1d00340CRzrP'
);

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Bronze',
    price: '1',
    description: [
      'Three Day Access',
      'Bronze Members Counter',
      'Base Analytics',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'outlined',
  },
  {
    title: 'Silver',
    price: '10',
    description: [
      'Lifetime Access',
      'Bronze & Silver Members Counter',
      'Extended Analytics',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'contained',
  },
  {
    title: 'Gold',
    price: '100',
    description: [
      'Lifetime Access',
      'All Members Counter',
      'Premium Analytics',
      'Rich Theme',
    ],
    buttonText: 'Buy Now',
    buttonVariant: 'outlined',
  },
];

const footers = [
  /*
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: [
      'Resource',
      'Resource name',
      'Another resource',
      'Final resource',
    ],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
  */
];

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Pricing() {
  const classes = useStyles();

  const handleClick = async (event) => {
    // Wazne zeby dac currentTarget, zwykly target zwraca spana w srodku buttona
    //console.log(event.currentTarget.id);
    const type = event.currentTarget.id;
    const chosenPrice = type == 'Bronze' ? 1 : type == 'Silver' ? 10 : 100;
    // Call your backend to create the Checkout Session—see previous step

    const response = await axios.get('/id', {
      params: {
        price: chosenPrice,
      },
    });
    const sessionId = response.data.session_id;
    console.log(response.data.session_id);
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    console.log(error.message);

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth='sm' component='main' className={classes.heroContent}>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Can You Waste One Dollar?
        </Typography>
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          component='p'
        >
          Find out where in the World people are able to pay one dollar to find
          out who else paid one dollar
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-end'>
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? null : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component='h2' variant='h3' color='textPrimary'>
                      ${tier.price}
                    </Typography>
                    <Typography variant='h6' color='textSecondary'></Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component='li'
                        variant='subtitle1'
                        align='center'
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color='primary'
                    id={tier.title}
                    onClick={handleClick}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth='md' component='footer' className={classes.footer}>
        <Grid container spacing={4} justify='space-evenly'>
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant='h6' color='textPrimary' gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href='#' variant='subtitle1' color='textSecondary'>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Pricing;
