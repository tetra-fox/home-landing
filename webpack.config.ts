// Webpack
import path from "path";
import webpack from "webpack";
import "webpack-dev-server";

// Plugins
import SvelteCheckPlugin from "svelte-check-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import Autoprefixer from "autoprefixer";
import TerserPlugin from "terser-webpack-plugin";

// Svelte preprocessors
import SveltePreprocess from "svelte-preprocess";
import Sequence from "./tools/sequence";

const config: webpack.Configuration = {
  mode: "production",
  entry: {
    index: "./src/ts/index.ts"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/i,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            preprocess: Sequence([
              SveltePreprocess({
                scss: true,
                sass: true,
                postcss: {
                  plugins: [Autoprefixer]
                }
              })
            ])
          }
        }
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/i,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.tsx?$/i,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [Autoprefixer]
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "./img/[hash][ext][query]"
        }
      },
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[hash][ext][query]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: ""
    }),
    new MiniCssExtractPlugin({
      filename: "./css/index.[contenthash].css"
    }),
    new SvelteCheckPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      new TerserPlugin()
    ],
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  externals: ["tls", "net", "fs"],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      zlib: require.resolve("browserify-zlib"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      stream: require.resolve("stream-browserify")
    },
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".tsx", ".ts", ".js", ".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  performance: {
    hints: false
  },
  output: {
    filename: "./js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  }
};

export default config;
