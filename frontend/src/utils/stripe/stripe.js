import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
