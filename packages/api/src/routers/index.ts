import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
import { githubRouter } from "./github";
import { todoRouter } from "./todo";

export const APP_VERSION = "0.0.0";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return { status: "OK", version: APP_VERSION };
	}),
	todo: todoRouter,
	github: githubRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
