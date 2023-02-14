import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const employeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.employee.findMany({
      include: {
        manager: {
          include: {
            role: true
          }
        },
        role: {
          include: {
            department: true,
          },
        },
      },
    });
  }),
  getSingle: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.employee.findUnique({
        where: {
          id: input.id,
        },
        include: {
          manager: true,
          role: {
            include: {
              department: true,
            },
          },
        },
      });
    }),

  add: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        role: z.number(),
        manager: z.number().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.employee.create({
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          role_id: input.role,
          manager_id: input.manager ? input.manager : null,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.employee.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        role: z.number().optional(),
        manager: z.number().optional().nullable(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.employee.update({
        where: {
          id: input.id,
        },
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          role_id: input.role,
          manager_id: input.manager,
        },
      });
    }),
});
