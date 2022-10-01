import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
  mode: "development",
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: "Games",
      template: "./src/index.html",
      fileName: "./build/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '.build'),
  },
};
