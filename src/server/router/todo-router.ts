import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const todoRouter = createProtectedRouter()
  .query('getAll', {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.todo.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: [{ completed: 'asc' }, { createdAt: 'desc' }],
      });
    },
  })
  .mutation('add', {
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
  .mutation('remove', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({ where: { id: input.id } });
    },
  })
  .mutation('complete', {
    input: z.object({
      id: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.findUnique({ where: { id: input.id } });

      return await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { completed: !todo?.completed },
      });
    },
  });
