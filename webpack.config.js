const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Serve({
        liveReload: true,
        host: "127.0.0.1",
        port: 5000
      })
  ]
};
