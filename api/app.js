import express from 'express';
import { get } from 'lodash';
import cors from 'cors';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { DateTime, Interval } from 'luxon';
import { nanoid } from 'nanoid';
import { generateBookingSlot } from './util/helpers';

const startServer = function startServer(port = process.env.PORT || 3000) {
  const app = express();
  const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
  };

  // Connect lowdb adapter to JSON file and make available to whole app
  const adapter = new FileSync('./db.json');
  const db = low(adapter);

  app.set('maxBookingsPerSlot', 3);

  app.get('/delivery-slots', cors(corsOptions), (req, res) => {
    const start = DateTime.local();
    const end = start.plus({ weeks: 4 });
    const deliveryPeriod = Interval.fromDateTimes(start, end);

    // Convert that Luxon interval into an array of ISO date strings
    const deliveryPeriodDates = deliveryPeriod.splitBy({ days: 1 }).map((date) => date.start.toISODate());

    // Retrieve saved delivery slots from database (only if they are within 4 week range)
    const deliverySlotRecords = db
      .get('deliverySlots')
      .filter((deliverySlot) => {
        const date = DateTime.fromISO(deliverySlot.date);
        return deliveryPeriod.contains(date);
      })
      .value();

    // Create an empty array for dates
    let deliverySlots = [];

    // Iterate over the dates within the specified period

    deliveryPeriodDates.forEach((date) => {
      const deliverySlot = deliverySlotRecords.find((record) => record.date === date);

      // If the date has a record in the database, add it to the list of slots
      if (deliverySlot) {
        deliverySlots.push(deliverySlot);
      } else {
        // Push a blank record with no slots to the array
        deliverySlots.push(generateBookingSlot(date));
      }
    });

    // Remove the first date from the response if all of the slots are booked
    const firstDeliverySlot = Object.values(deliverySlots[0].slots);

    if (firstDeliverySlot.every((slot) => slot.booked === true)) {
      deliverySlots = deliverySlots.slice(1);
    }

    res.json(deliverySlots);
  });

  app.post('/delivery-slots/book-slot', cors(corsOptions), (req, res) => {
    const { date, slot } = req.body;

    // Find the delivery slots by date in the db
    const deliverySlot = db
      .get('deliverySlots')
      .find({ date })
      .value();

    // If the slot doesn't exist, create it with the booking added
    if (!deliverySlot) {
      const newSlot = generateBookingSlot(date);
      newSlot.slots[slot].bookings.push({ id: nanoid(8), item: 'Kentia Palm' });

      db.get('deliverySlots').push(newSlot).write();
    } else {
      // If the slot exists, ensure that the amount of bookings is not greater than the maximum
      const existingBookings = get(deliverySlot, `slots.${slot}.bookings`);

      if (existingBookings.length < app.get('maxBookingsPerSlot')) {
        db.get('deliverySlots')
          .find({ date })
          .get(`slots.${slot}.bookings`)
          .push({ id: nanoid(8), item: 'Kentia Palm' })
          .write();

        res.status(200).send('Booking successful');
      } else {
        res.status(500).send('There is already the maximum number of bookings allowed for this slot.');
      }
    }
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
