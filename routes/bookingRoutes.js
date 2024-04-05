const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.getAllBookings,
  )
  .post(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.createNewBooking,
  );

router
  .route('/:id')
  .get(bookingController.getSingleBooking)
  .patch(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.updateBooking,
  )
  .delete(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.deleteBooking,
  );

module.exports = router;
