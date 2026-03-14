import type { Context as HonoContext } from "hono";

export interface CreateContextOptions {
	context: HonoContext;
}

export function createContext(_options: CreateContextOptions) {
	return {
		session: null,
	};
}

export type Context = ReturnType<typeof createContext>;
