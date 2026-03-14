import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
import { APP_VERSION } from "../version";
import { githubRouter } from "./github";
import { todoRouter } from "./todo";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return { status: "OK", version: APP_VERSION };
	}),
	todo: todoRouter,
	github: githubRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
