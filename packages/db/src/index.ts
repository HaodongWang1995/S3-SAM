import { env } from "@FetchGithubInfo/env/server";
import { drizzle } from "drizzle-orm/node-postgres";

import { githubInfo } from "./schema/github-info";
import { todo } from "./schema/todo";

export const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
		ssl:
			env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
	},
	schema: { todo, githubInfo },
});
