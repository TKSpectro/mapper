import superjson from 'superjson';
import { createRouter } from './context';

import { todoRouter } from './todo-router';

export const appRouter = createRouter()
  .transformer(superjson)
  // .merge('example.', exampleRouter)
  // .merge('question.', protectedExampleRouter)
  .merge('todo.', todoRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
