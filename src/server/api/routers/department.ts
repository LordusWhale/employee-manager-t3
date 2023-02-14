import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const departmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.department.findMany({
      include: {
        role: {
          include: {
            _count: {
              select: {
                employee: true,
              },
            },
          },
        },
       
      },
    });
  }),
  getSingle: publicProcedure.input(z.object({ id: z.number() })).query(({ input, ctx }) => {
    return ctx.prisma.department.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
  add: publicProcedure.input(z.object({ name: z.string() })).mutation(({ input, ctx }) => {
    return ctx.prisma.department.create({
      data: {
        name: input.name,
      },
    });
  }),
  update: publicProcedure.input(z.object({ id: z.number(), name: z.string().optional() })).mutation(({ input, ctx }) => {
    return ctx.prisma.department.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
      },
    });
  }),
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ input, ctx }) => {
    return ctx.prisma.department.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
