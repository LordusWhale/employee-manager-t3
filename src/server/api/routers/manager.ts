import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";



export const managerRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.employee.findMany({
            where: {
                other_employee: {
                    some: {
                        NOT: {
                            manager_id: null
                        }
                    }
                }
            },
            include: {
                other_employee: {
                    include: {
                        role: true
                    }
                },
                role: true
            }
        })
    }
    ),
})
