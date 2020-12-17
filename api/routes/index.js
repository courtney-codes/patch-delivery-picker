import express from 'express';
import deliverySlotsRoutes from './delivery-slots';

const getRoutes = function getRoutes(db) {
  const router = express.Router();

  router.use('/delivery-slots', deliverySlotsRoutes(db));

  return router;
};

export default getRoutes;
