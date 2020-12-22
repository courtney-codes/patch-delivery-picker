import express from 'express';
import deliverySlotsRoutes from './delivery-slots';

const routes = function getRoutes() {
  const router = express.Router();

  router.use('/delivery-slots', deliverySlotsRoutes);

  return router;
};

export default routes;
