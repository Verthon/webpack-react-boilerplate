import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const isAnalyze = !!process.env.ANALYZE_BUILD;
const defaultPort = Number(process.env.PORT) || 8080;

export default defineConfig({
	source: {
		entry: { main: "./src/index.ts" },
	},

	plugins: [pluginReact()],

	performance: {
		bundleAnalyze: isAnalyze
			? {
					analyzerMode: "server",
					openAnalyzer: true,
			  }
			: {},
	},

	html: {
		template: "./public/index.html",
	},

	output: {
		distPath: { root: "dist" },
		assetPrefix: "/",
		polyfill: "usage",
	},
	server: {
		port: defaultPort,
		historyApiFallback: true,
	},

	dev: {
		hmr: true,
		liveReload: false,
		client: {
			overlay: false,
		},
	},
});
