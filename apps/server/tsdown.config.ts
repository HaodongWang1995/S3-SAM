import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: "./src/index.ts",
		format: "esm",
		outDir: "./dist",
		clean: true,
		noExternal: [/@FetchGithubInfo\/.*/],
	},
	{
		entry: { lambda: "./src/lambda.ts" },
		format: "esm",
		outDir: "./dist",
		noExternal: [/.*/],
	},
]);
