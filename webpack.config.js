const devCerts = require("office-addin-dev-certs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const urlDev="https://localhost:2000/";
const urlProd="https://app.mifirma.co/"; // CHANGE THIS TO YOUR PRODUCTION DEPLOYMENT LOCATION

module.exports = async (env, options) => {
    const dev = options.mode === "development";
    const buildType = dev ? "dev" : "prod";
    const config = {
        node: {
          fs: 'empty'
        },
        devtool: "source-map",
        entry: {
          polyfill: "@babel/polyfill",
          app: "./src/app/app.js",
          firmador: "./src/app/firmador.js",
          taskpane: "./src/taskpane/taskpane.js",      
          commands: "./src/commands/commands.js",
          fallbackauthdialog: "./src/helpers/fallbackauthdialog.js"
        },
        resolve: {
          extensions: [".ts", ".tsx", ".html", ".js"]
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader", 
                options: {
                  presets: ["@babel/preset-env"]
                }
              }
            },
            {
              test: /\.html$/,
              exclude: /node_modules/,
              use: "html-loader"
            },
            {
              test: /\.(png|jpg|jpeg|gif|svg)$/,
              loader: "file-loader",
              options: {
                name: '[path][name].[ext]',          
              }
            }
          ]
        },
        plugins: [
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            filename: "taskpane.html",
            template: "./src/taskpane/taskpane.html",
            chunks: ["polyfill", "taskpane"]
          }),
          new CopyWebpackPlugin({
            patterns: [
            {
              to: "taskpane.css",
              from: "./src/taskpane/taskpane.css"
            },
            {
              to: "[name]." + buildType + ".[ext]",
              from: "manifest*.xml",
              transform(content) {
                if (dev) {
                  return content;
                } else {
                  return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
                }
              }
            }
          ]}),
          new HtmlWebpackPlugin({
            filename: "logout.html",
            template: "./src/app/logout.html",
            chunks: ["polyfill", "app"]
          }),
          new HtmlWebpackPlugin({
            filename: "documentos.html",
            template: "./src/app/documentos.html",
            chunks: ["polyfill", "app"]
          }),
          new HtmlWebpackPlugin({
            filename: "app.html",
            template: "./src/app/app.html",
            chunks: ["polyfill", "app"]
          }),
          new CopyWebpackPlugin({
            patterns: [
            {
              to: "app.css",
              from: "./src/app/app.css"
            },
            {
              to: "common.css",
              from: "./src/app/common.css"
            },
            {
              to: "[name]." + buildType + ".[ext]",
              from: "manifest*.xml",
              transform(content) {
                if (dev) {
                  return content;
                } else {
                  return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
                }
              }
            }
          ]}),
          new HtmlWebpackPlugin({
            filename: "firmador.html",
            template: "./src/app/firmador.html",
            chunks: ["polyfill", "firmador"]
          }),
          new CopyWebpackPlugin({
            patterns: [
            {
              to: "firmador.css",
              from: "./src/app/firmador.css"
            },
            {
              to: "[name]." + buildType + ".[ext]",
              from: "manifest*.xml",
              transform(content) {
                if (dev) {
                  return content;
                } else {
                  return content.toString().replace(new RegExp(urlDev, "g"), urlProd);
                }
              }
            }
          ]}),
          new CopyWebpackPlugin({
            patterns: [{ 
              from: './src/app/lib/webviewer',
              to: 'lib/webviewer' 
            }]
          }),
          new CopyWebpackPlugin({
            patterns: [{ 
              from: './src/app/lib/favicon',
              to: 'assets/img/favicon' 
            }]
          }),
          new CopyWebpackPlugin({
            patterns: [{ 
              from: './assets/img',
              to: 'assets/img' 
            }]
          }),
          new CopyWebpackPlugin({
            patterns: [{ 
              from: './src/app/lib/fonts',
              to: 'assets/fonts' 
            }]
          }),
          new CopyWebpackPlugin({
            patterns: [{ 
              from: './src/app/lib/fonts',
              to: 'assets' 
            }]
          }),
          new HtmlWebpackPlugin({
            filename: "fallbackauthdialog.html",
            template: "./src/helpers/fallbackauthdialog.html",
            chunks: ["polyfill", "fallbackauthdialog"]
        }),
          new HtmlWebpackPlugin({
            filename: "commands.html",
            template: "./src/commands/commands.html",
            chunks: ["polyfill", "commands"]
          })
        ],
        devServer: {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },      
          https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
          port: process.env.npm_package_config_dev_server_port || 2000
        }
      };

    return config;
};