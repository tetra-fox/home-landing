import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import * as HtmlMinimizerPlugin from "html-minimizer-webpack-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
    mode: "production",
    entry: {
        index: "./src/ts/index.ts"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
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
            template: "./src/html/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        })
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new HtmlMinimizerPlugin()]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    performance: {
        hints: false
    },
    output: {
        filename: "./js/[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    }
};

export default config;