/* eslint-disable import/prefer-default-export */
export const generateBookingSlot = (date) => (
  {
    date,
    slots: {
      AM: {
        bookings: [],
      },
      PM: {
        bookings: [],
      },
      EVE: {
        bookings: [],
      },
    },
  }
);
