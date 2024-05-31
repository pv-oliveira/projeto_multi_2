const path = require('path');
const webpack = require('webpack');

module.exports = {
  // Define o ponto de entrada
  entry: './src/index.js',
  // Define o ponto de saída
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Regras para transpilar arquivos JavaScript usando Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Regras para carregar arquivos SVG usando @svgr/webpack
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      // Regras para carregar arquivos CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Regras para carregar arquivos de imagem
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    // Define jQuery como global para ser usado pelo Bootstrap
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};