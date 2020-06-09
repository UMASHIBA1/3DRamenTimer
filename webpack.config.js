const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const workBoxWebpackPlugin = require("workbox-webpack-plugin");
const outputPath = path.resolve(__dirname, "public");

// []webpackを使いたかったらyarn buildでいける
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: `${outputPath}`,
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.png$/i,
        loader: "file-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: true,
          minimize: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    contentBase: `${outputPath}/`,
    open: true,
    hot: true,
    inline: true,
    watchContentBase: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html",
    }),
    new WebpackPwaManifest({
      short_name: "3D Timer",
      name: "3D Ramen Timer",
      display: "standalone",
      start_url: "index.html",
      background_color: "#202124",
      theme_color: "#FF0000",
      icons: [
        {
          src: path.resolve("src/images/icon_512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new workBoxWebpackPlugin.GenerateSW({
      swDest: outputPath + "/service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
