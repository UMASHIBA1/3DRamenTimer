const path = require("path");

const outputPath = path.resolve(__dirname, "public");

// []webpackを使いたかったらyarn webpackでいける
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: `${outputPath}/js`
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devServer: {
    contentBase: `${outputPath}/`,
    open: true,
    hot: true,
    inline: true,
    watchContentBase: true
  }
};
