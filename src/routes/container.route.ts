import { Router } from 'express';
import { createContainer, getAllContainers, getRunningContainers, stopContainer } from '../controllers/container.controller';

const containerRoute = () => {
  const router = Router();

  router.post('/', createContainer);

  router.get('/', getRunningContainers);

  router.delete('/', stopContainer);

  return router;
};

export { containerRoute };
