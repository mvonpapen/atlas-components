const path = require(`path`)
const { CleanWebpackPlugin } = require(`clean-webpack-plugin`)

const commonPublicPath = `/dist/`
const vendorsBundleName = `vendors`

module.exports = {
  entry: {
    atlasAutocomplete: [`@babel/polyfill`, `./html/render.js`]
  },

  plugins: [
    new CleanWebpackPlugin()
  ],

  output: {
    library: `[name]`,
    filename: `[name].bundle.js`,
    publicPath: commonPublicPath,
    devtoolNamespace: `firefox`
  },

  optimization: {
    runtimeChunk: {
       name: vendorsBundleName
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: vendorsBundleName,
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\//,
        use: `babel-loader`
      }
    ]
  },

  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, `html`),
    publicPath: commonPublicPath
  }
}
