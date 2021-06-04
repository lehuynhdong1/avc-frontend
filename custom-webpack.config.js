const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        apiUrl: JSON.stringify(process.env.apiUrl),
        production: !!process.env.production
      }
    })
  ]
};
