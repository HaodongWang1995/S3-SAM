import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const githubInfo = pgTable("github_info", {
	id: serial("id").primaryKey(),
	token: text("token").notNull(),
	login: text("login").notNull(),
	name: text("name"),
	avatarUrl: text("avatar_url").notNull(),
	bio: text("bio"),
	publicRepos: integer("public_repos").notNull(),
	followers: integer("followers").notNull(),
	following: integer("following").notNull(),
	htmlUrl: text("html_url").notNull(),
	githubCreatedAt: text("github_created_at").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
