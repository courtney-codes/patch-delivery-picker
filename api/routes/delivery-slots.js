import express from 'express';
import { DateTime, Interval } from 'luxon';

const getDeliverySlots = function getDeliverySlots(db) {
  // Create a Luxon interval for 4 weeks from the current date
  const start = DateTime.local();
  const end = start.plus({ weeks: 4 });
  const deliveryPeriod = Interval.fromDateTimes(start, end);

  const deliveryDates = deliveryPeriod
    .splitAt({ days: 1 })
    .map((date) => date.start.toIsoDate());
};

const deliverySlotsRoutes = function deliverySlotsRoutes(db) {
  const router = express.Router();
  router.get('/delivery-slots', getDeliverySlots(db));
  return router;
};

export default deliverySlotsRoutes;
