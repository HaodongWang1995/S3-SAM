import { Button } from "@FetchGithubInfo/ui/components/button";
import { Input } from "@FetchGithubInfo/ui/components/input";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { client } from "@/utils/orpc";

export const Route = createFileRoute("/github")({
	component: GithubComponent,
});

function GithubComponent() {
	const [token, setToken] = useState("");

	const githubInfo = useMutation({
		mutationFn: (token: string) => client.github.getGithubInfo({ token }),
	});

	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<h1 className="mb-6 font-bold text-2xl">Fetch GitHub Info</h1>

			<div className="flex gap-2">
				<Input
					onChange={(e) => setToken(e.target.value)}
					placeholder="Enter your GitHub Token"
					type="password"
					value={token}
				/>
				<Button
					disabled={!token || githubInfo.isPending}
					onClick={() => githubInfo.mutate(token)}
				>
					{githubInfo.isPending ? "Loading..." : "Fetch"}
				</Button>
			</div>

			{githubInfo.isError && (
				<div className="mt-4 rounded-lg border border-red-500 p-4 text-red-500 text-sm">
					{githubInfo.error.message}
				</div>
			)}

			{githubInfo.data && (
				<div className="mt-6 rounded-lg border p-6">
					<div className="flex items-center gap-4">
						<img
							alt={githubInfo.data.login}
							className="h-16 w-16 rounded-full"
							height={64}
							src={githubInfo.data.avatarUrl}
							width={64}
						/>
						<div>
							<h2 className="font-semibold text-lg">
								{githubInfo.data.name ?? githubInfo.data.login}
							</h2>
							<p className="text-muted-foreground text-sm">
								@{githubInfo.data.login}
							</p>
						</div>
					</div>

					{githubInfo.data.bio && (
						<p className="mt-4 text-sm">{githubInfo.data.bio}</p>
					)}

					<div className="mt-4 flex gap-6 text-sm">
						<span>Repos: {githubInfo.data.publicRepos}</span>
						<span>Followers: {githubInfo.data.followers}</span>
						<span>Following: {githubInfo.data.following}</span>
					</div>
				</div>
			)}
		</div>
	);
}
