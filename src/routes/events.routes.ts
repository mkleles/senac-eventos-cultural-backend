// src/routes/event.routes.ts
import { Router } from 'express';
import { ensureAuth, ensureRole } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';
import {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  listMyEvents
} from '../controllers/events.controller';

const router = Router();

// Rotas abertas
router.get('/', listEvents);
router.get('/:id', getEvent);


// Rotas protegidas (apenas ORGANIZER)
router.post(
  '/',
  ensureAuth,
  ensureRole('ORGANIZER'),
  upload.single('banner'),
  createEvent
);

router.get(
  '/myevents',
  ensureAuth,
  ensureRole('ORGANIZER'),
  listMyEvents
);

router.put(
  '/:id',
  ensureAuth,
  ensureRole('ORGANIZER'),
  upload.single('banner'),
  updateEvent
);

router.delete(
  '/:id',
  ensureAuth,
  ensureRole('ORGANIZER'),
  deleteEvent
);

export default router;
