import { db } from "@FetchGithubInfo/db";
import { githubInfo } from "@FetchGithubInfo/db/schema/github-info";
import { ORPCError } from "@orpc/server";
import z from "zod";

import { publicProcedure } from "../index";

interface GitHubUser {
	avatar_url: string;
	bio: string | null;
	created_at: string;
	followers: number;
	following: number;
	html_url: string;
	login: string;
	name: string | null;
	public_repos: number;
}

export const githubRouter = {
	getGithubInfo: publicProcedure
		.input(z.object({ token: z.string().min(1) }))
		.handler(async ({ input }) => {
			const response = await fetch("https://api.github.com/user", {
				headers: {
					Authorization: `Bearer ${input.token}`,
					Accept: "application/vnd.github.v3+json",
				},
			});

			if (!response.ok) {
				const error = await response.text();
				throw new ORPCError("BAD_REQUEST", {
					message: `GitHub API error: ${response.status} ${error}`,
				});
			}

			const user = (await response.json()) as GitHubUser;

			const record = {
				token: input.token,
				login: user.login,
				name: user.name,
				avatarUrl: user.avatar_url,
				bio: user.bio,
				publicRepos: user.public_repos,
				followers: user.followers,
				following: user.following,
				htmlUrl: user.html_url,
				githubCreatedAt: user.created_at,
			};

			try {
				await db.insert(githubInfo).values(record);
			} catch (err) {
				console.error("Failed to save github info:", err);
			}

			return record;
		}),
};
