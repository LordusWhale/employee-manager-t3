import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const roleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.role.findMany({
      orderBy: {
        department: {
            name: "asc",
        }
      },
      include: {
        department: true,
        _count: {
          select: {
            employee: true,
          },
        },
      },
    });
  }),
  getSingleRole: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.role.findUnique({
        where: {
          id: input.id,
        },
        include: {
          department: true,
        },
      });
    }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        department: z.number(),
        salary: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.role.create({
        data: {
          title: input.title,
          department_id: input.department,
          salary: input.salary,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.role.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        department: z.number().optional(),
        salary: z.number().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.role.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          department_id: input.department,
          salary: input.salary,
        },
      });
    }),
});
