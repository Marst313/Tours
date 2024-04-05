import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51P0dcaBQXiwOHdIVXe6s4zduTULragcugyBRhdRZvA2fySA7qIKJoyO8nfuUIyLqSJgbEuszDZGQHyOxL6QLzT4k00Hx4LzwDZ',
  );

  try {
    //* Get checkout session from api
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
