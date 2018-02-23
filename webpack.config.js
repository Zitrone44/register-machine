const path = require('path')

module.exports = {
  entry: {
    bundle: path.join(__dirname, 'main.js'),
  },
  output: {
    path: __dirname,
    filename: '[name].min.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
