import superjson from 'superjson';
import { createRouter } from './context';

import { meetingRouter } from './meeting-router';
import { todoRouter } from './todo-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('todo.', todoRouter)
  .merge('meeting.', meetingRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
