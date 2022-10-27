const path = require("path");

module.exports = (env) => ({
  mode: "production",
  target: "web",
  entry: {
    index: ["./src/index.ts"],
  },
  output: {
    path: path.resolve("build"),
    filename: "index.js",
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          compilerOptions: { noEmit: false },
          configFile:
            env.config === "mjs" ? "tsconfig.json" : "tsconfig-commonjs.json",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react", "stage-0"],
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  optimization: {
    minimize: true,
    usedExports: true,
  },
});
