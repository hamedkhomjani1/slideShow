import { resolve } from "path";

import { DefinePlugin } from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

import autoprefixer from "autoprefixer";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminWebp from "imagemin-webp";

export default {
    entry: {
        app: "./app/app.jsx"
    },
    output: {
        path: resolve(__dirname, "build"),
        filename: "[chunkhash].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"]
    },
    optimization: {
        splitChunks: {
            minSize: 30000,
            maxSize: 50000
        }
    },
    stats: "minimal",
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {

                        },
                    },
                ],
            },
            {
                test: /\.(jpg)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:5]"
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    autoprefixer({}),
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DefinePlugin({ SECRETS: process.env.SECRETS }),
        new HtmlWebpackPlugin({
            base: "/",
            chunks: ["app"],
            filename: "index.html",
            template: "index.html"
        }),
        
    ],
    devServer: {
        host: "0.0.0.0",
        useLocalIp: true,
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                secure: false,
                changeOrigin: true
            }
        },
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8080,
        open:true,
        historyApiFallback: true
    }
};