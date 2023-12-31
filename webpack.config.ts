import path from "path";
import { type Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { loadEnvs, mapEnvsToConfig } from "./config/env";
import { createDevServerConfig } from "./config/devServer";

const createWebpackConfig = (mode: Configuration["mode"]): Configuration => {
	const envs = loadEnvs();
	const envsConfig = mapEnvsToConfig(envs);

	return {
		mode: mode,
		entry: path.resolve(process.cwd(), "src/index.ts"),
		module: {
			rules: [
				{
					test: /\.(js|mjs|ts|tsx)$/,
					include: path.resolve(process.cwd(), "src"),
					loader: "babel-loader",
				},
			],
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js"],
		},
		...(mode === "development"
			? {
					devServer: createDevServerConfig(),
			  }
			: {}),
		output: {
			path: path.resolve(process.cwd(), "dist"),
			publicPath: "/",
			clean: true,
		},
		plugins: [
			new DefinePlugin(envsConfig),
			new HtmlWebpackPlugin({
				inject: true,
				template: path.resolve(process.cwd(), "public/index.html"),
			}),
		],
	};
};

export default createWebpackConfig;
