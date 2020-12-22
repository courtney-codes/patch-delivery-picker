import express from 'express';
import cors from 'cors';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { DateTime, Interval } from 'luxon';

const startServer = function startServer(port = process.env.PORT || 3000) {
  const app = express();
  const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
  };

  // Connect lowdb adapter to JSON file and make available to whole app
  const adapter = new FileSync('./db.json');
  const db = low(adapter);

  app.get('/delivery-slots', cors(corsOptions), (req, res) => {
    const start = DateTime.local();
    const end = start.plus({ weeks: 4 });
    const deliveryPeriod = Interval.fromDateTimes(start, end);

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
    let deliverySlots = [];

    // Iterate over the dates within the specified period

    deliveryPeriodDates.forEach((date) => {
      const deliverySlot = deliverySlotRecords.find((record) => record.date === date);

      // If the date has a record in the database, add it to the list of slots
      if (deliverySlot) {
        deliverySlots.push(deliverySlot);
      } else {
      // Push a blank record with no slots to the array
        deliverySlots.push(
          {
            date,
            slots: {
              AM: { booked: false },
              PM: { booked: false },
              EVE: { booked: false },
            },
          },
        );
      }
    });

    // Remove the first date from the response if all of the slots are booked
    const firstDeliverySlot = Object.values(deliverySlots[0].slots);

    if (firstDeliverySlot.every((slot) => slot.booked === true)) {
      deliverySlots = deliverySlots.slice(1);
    }

    res.json(deliverySlots);
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
