import { Router } from 'express';
import { createContainer, deleteContainer, getAllContainers, getContainer, updateContainer, stopContainer } from '../controllers/container.controller';

const containerRoute = () => {
  const router = Router();

  router.post('/', createContainer);

  router.get('/', getAllContainers);

  router.delete('/', stopContainer);

  return router;
};

export { containerRoute };
