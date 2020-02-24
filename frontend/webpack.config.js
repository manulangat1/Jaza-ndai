var BundleTracker = require('webpack-bundle-tracker')
module.exports = {
    module: {
      // plugins :[],
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins:[
      new BundleTracker({filename: './webpack-stats.json'}),
    ]
  };