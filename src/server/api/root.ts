import { createTRPCRouter } from "./trpc";
import { employeeRouter } from "./routers/employee";
import { roleRouter } from "./routers/role";
import { departmentRouter } from "./routers/department";
import { managerRouter } from "./routers/manager";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  employee: employeeRouter,
  role: roleRouter,
  department: departmentRouter,
  managers: managerRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
