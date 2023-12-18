const path = require('node:path');
const HelloWorldPlugin = require("./plugin/hello.plugin");
const AssetsListPlugin = require("./plugin/assets.plugin");

module.exports = {
  entry: {
    'tree-shaking': './src/index.js',
    ffmpeg: './src/ffmpeg.js'
  },
  mode: "production",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    chunkFilename(pathData) {
      if (pathData?.chunk?.name === 'coop.ffmpeg') {
        return 'ffmpeg/[name].[contenthash:10].js';
      }
      return '[id].js'
    }
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new HelloWorldPlugin(),
    new AssetsListPlugin()
  ],
  experiments: {
    topLevelAwait: true
  },
  module: {
    rules: [
      {
        test: /@ffmpeg\/core/,
        type: "asset/resource",
        generator: {
          filename: 'ffmpeg/[contenthash:10][ext]',
        },
      },
      {
        test: /@ffmpeg\/ffmpeg/,
        use: [
          {
            loader: path.resolve(__dirname, 'loader/ffmpeg.loader.js'),
            options: {
              name: 'ffmpeg/[contenthash:10][ext]',
            }
          }
        ],
      },
      {
        test: /@ffmpeg\/ffmpeg/,
        use: [
          {
            loader: path.resolve(__dirname, 'loader/m.loader.js'),
          }
        ],
      },
      {
        test: /@ffmpeg\/ffmpeg/,
        use: [
          {
            loader: path.resolve(__dirname, 'loader/resolve.loader.js'),
          }
        ],
      }
    ]
  },
  cache: {
    type: "filesystem"
  },
};
