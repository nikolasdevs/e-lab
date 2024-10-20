const webpack = require("webpack");
const dotenv = require("dotenv").config(); // Load environment variables from .env file
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_CLASS_ENDPOINT": JSON.stringify(
        process.env.API_CLASS_ENDPOINT
      ),
      "process.env.API_MEDICINE_ENDPOINT": JSON.stringify(
        process.env.API_MEDICINE_ENDPOINT
      ),
    }),
  ],
  devtool: "source-map",
};
