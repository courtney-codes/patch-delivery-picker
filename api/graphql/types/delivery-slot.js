const { gql } = require('apollo-server-express');

const DeliverySlot = gql`
  enum AllowedTimeslot {
    AM
    PM
    EVE
  }

  type DeliverySlot {
    date: String,
    timeslot: AllowedTimeslot
  }
`;

module.exports = DeliverySlot;
