const path = require("path")
const EventHooksPlugin = require("event-hooks-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const fs = require("fs")
const autoprefixer = require("autoprefixer")
const purgecss = require("@fullhuman/postcss-purgecss")

module.exports = ({ production, development }) => ({
    mode: production ? "production" : development ? "development" : "none",
    devtool: production ? undefined : "eval-cheap-source-map",
    entry: {
        home: "./src/js/pages/home.js",
        about: "./src/js/pages/about.js",
        service: "./src/js/pages/service.js",
        faq: "./src/js/pages/faq.js",
        contact: "./src/js/pages/contact.js",
        sw: "./src/public/sw.js",
        styles: "./src/scss/main.scss"
    },
    watch: development,
    output: {
        path: path.join(process.cwd(), "build"),
        filename: data => {
            const name = data.chunk.name
            // "styles" generates a useless .js file, so we mark it for deletion
            if (name === "styles") return "DELETE_ME"
            else if (name === "sw") return "public/[name].js"
            else if (["home", "about", "service", "faq", "contact"].includes(name)) return "js/[name].js"
            else return "[name].js"
        },
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["@babel/preset-env", { targets: "defaults" }]]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: (() => {
                    const use = []
                    use.push(
                        {
                            loader: "file-loader",
                            options: { name: "styles/styles.css" }
                        },
                        {
                            loader: "extract-loader"
                        },
                        {
                            loader: "css-loader"
                        }
                    )

                    // only use CSS changes in production to speed up development compilation
                    production &&
                        use.push({
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        purgecss({
                                            content: ["./src/**/*.html"],
                                            safelist: [
                                                /^mdc.*/,
                                                /.*--shifted-left$/,
                                                "nav-bar__menu-button--hidden",
                                                "question--expanded"
                                            ]
                                        }),
                                        autoprefixer()
                                    ]
                                }
                            }
                        })

                    use.push({
                        loader: "sass-loader",
                        options: {
                            // Prefer Dart Sass
                            implementation: require("sass"),

                            // See https://github.com/webpack-contrib/sass-loader/issues/804
                            webpackImporter: false,
                            sassOptions: {
                                includePaths: ["./node_modules"]
                            }
                        }
                    })

                    return use
                })()
            }
        ]
    },
    plugins: [
        new EventHooksPlugin({
            done: () => {
                const build = path.join(__dirname, "build")
                if (fs.readdirSync(build).includes("DELETE_ME")) fs.unlinkSync(path.join(build, "DELETE_ME"))
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/assets", to: "assets" },
                { from: "./src/public", to: "public", globOptions: { ignore: ["**/sw.js"] } }
            ]
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin({ extractComments: false })]
    }
})
