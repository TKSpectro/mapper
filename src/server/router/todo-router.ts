import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const todoRouter = createProtectedRouter()
  .query('getTodos', {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.todo.findMany({ where: { userId: ctx.session.user.id } });
    },
  })
  .mutation('addTodo', {
    input: z.object({
      title: z.string(),
      description: z.string().nullish(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: {
          title: input.title,
          description: input.description,
          completed: false,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    },
  })
  .mutation('removeTodo', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({ where: { id: input.id } });
    },
  });
