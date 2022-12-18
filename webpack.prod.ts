import { Configuration } from "webpack";
import { merge } from "webpack-merge"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import commonConfig from "./webpack.common"

export default merge<Configuration>(commonConfig, {
  devtool: 'source-map',
  mode: "production",
  optimization: {
    minimizer: [
     `...`,
      new CssMinimizerPlugin(),
    ]
  }
})
