import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PUBLISHABLE_KEY, process.env.SECRET_KEY);
const app = express();
const port = 3000;
const stripe = Stripe(
  'sk_test_51KYA9VCNnCwJI35CosAEtcxmuLVB60zXwL7fALnNcP8CkpLGi64jKo90u6PR1UrJa6D8LSTdDPyp3xfcVSlEjyKU00I5GPqBbT',
  {apiVersion: '2020-08-27'},
);
app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
app.post('/create-payment-intent', async (req, res) => {
  console.log('hello jani===>');
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: 'usd',
    });
    console.log('intent ===>', paymentIntent);

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
      error: '',
    });
  } catch (e) {
    console.log(e);
    res.json({error: e.message, clientSecret: ''});
  }
});
