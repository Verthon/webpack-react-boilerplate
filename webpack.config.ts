import path from "path";
import type { Configuration } from "webpack";

const createWebpackConfig = (mode: Configuration["mode"]): Configuration => {
	return {
		mode: mode,
		entry: path.resolve(process.cwd(), "src/index.js"),
		resolve: {
			extensions: ['.js'],
		},
		output: {
			path: path.resolve(process.cwd(), "dist"),
			clean: true,
		},
	};
};

export default createWebpackConfig;
