import express from 'express';
import { DateTime, Interval } from 'luxon';

const getDeliverySlots = async function getDeliverySlots(req, res) {
  // Create a Luxon interval for 4 weeks from the current date
  const start = DateTime.local();
  const end = start.plus({ weeks: 4 });
  const deliveryPeriod = Interval.fromDateTimes(start, end);

  const db = req.app.get('db');

  // Convert that Luxon interval into an array of ISO date strings
  const deliveryPeriodDates = deliveryPeriod
    .splitBy({ days: 1 })
    .map((date) => date.start.toISODate());

  // Retrieve saved delivery slots from database (only if they are within 4 week range)
  const deliverySlotRecords = db.get('deliverySlots')
    .filter((deliverySlot) => {
      const date = DateTime.fromISO(deliverySlot.date);
      return deliveryPeriod.contains(date);
    })
    .value();

  // Create an empty array for dates
  const deliverySlots = [];

  // Iterate over the dates within the specified period

  deliveryPeriodDates.forEach((date) => {
    const deliverySlot = deliverySlotRecords.find((record) => record.date === date);

    // If the date has a record in the database, add it to the list of slots
    if (deliverySlot) {
      deliverySlots.push(deliverySlot);
    } else {
      // Push a blank record with no slots to the array
      deliverySlots.push({ date, slots: {} });
    }
  });

  res.json(deliverySlots);
};

const deliverySlotsRoutes = function getDeliverySlotsRoutes() {
  const router = express.Router();

  router.get('/delivery-slots', getDeliverySlots);

  return router;
};

export default deliverySlotsRoutes;
