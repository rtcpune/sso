const webpack = require("webpack");

const config = {
  webpack: {
    // configure: {
    resolve: {
      fallback: {
        process: require.resolve("process/browser"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        asset: require.resolve("assert"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      }),
    ],
    // },
  },
};

export default config;
