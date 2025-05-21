'use strict';

const webpack = require('webpack');
const fs = require('fs');
const webpackMerge = require('webpack-merge');
const index = require('../shared/matrix-build.97745788.cjs');
const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
const MatrixVersionWebpack = require('@king-fisher/matrix-version-plugin');

// const vueLoader = require('vue-loader');

const tools = require('@king-fisher/tools');
const EnvPlugin = require('@king-fisher/env-plugin');
require('ora');
require('chokidar');

function _interopDefaultCompat(e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

function _interopNamespaceCompat(e) {
  if (e && typeof e === 'object' && 'default' in e) return e;
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const webpack__default = /*#__PURE__*/_interopDefaultCompat(webpack);
const path__namespace = /*#__PURE__*/_interopNamespaceCompat(path);
const FriendlyErrorsWebpackPlugin__default = /*#__PURE__*/_interopDefaultCompat(FriendlyErrorsWebpackPlugin);
const MatrixVersionWebpack__default = /*#__PURE__*/_interopDefaultCompat(MatrixVersionWebpack);
const EnvPlugin__default = /*#__PURE__*/_interopDefaultCompat(EnvPlugin);

const getBabelPresets = (framework) => {
  const _framework = framework || "vue";
  const presetsMap = {
    vue: [
      [
        "@vue/babel-preset-app",
        {
          targets: {
            browsers: ["Android >= 5", "safari >= 7"]
          },
          useBuiltIns: "usage"
        }
      ],
      ["@babel/preset-typescript", { allExtensions: true }]
    ],
    react: [
      ["@babel/preset-env"],
      ["@babel/preset-typescript"],
      ["@babel/preset-react"]
    ]
  };
  return presetsMap[_framework];
};
function getBabelConfig(options) {
  const { framework } = options;

  return {
    presets: getBabelPresets(framework),
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-export-namespace-from"
    ]
  };
}


const getCssRule = (options = {}) => {

  const CSS_LOADERS = [
    // 'isomorphic-style-loader' ---> ssr 优先级最高,
    // 'vue-style-loader' ---> framework === 'vue',
    // 'style-loader' ---> framework === 'react',
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          path: index.ROOT_POSTCSS_CONFIG_FILE,
          plugins: [require("tailwindcss"), require("autoprefixer")]
        }
      }
    }
  ];
  const { framework, ssr } = options;
  if (ssr) {
    CSS_LOADERS.unshift("isomorphic-style-loader");
  } else if (framework === "react") {
    CSS_LOADERS.unshift("style-loader");
  } else {
    CSS_LOADERS.unshift("vue-style-loader");
  }
  return [
    {
      test: /\.css$/,
      // ! 当sideEffects设置为true时，它表示该模块可能会影响模块外部的全局状态，例如添加全局变量或执行某些全局操作
      sideEffects: true,
      use: [...CSS_LOADERS]
    },
    {
      test: /\.less$/,
      sideEffects: true,
      use: [...CSS_LOADERS, "less-loader"]
    },
    {
      test: /\.scss$/,
      sideEffects: true,
      use: [...CSS_LOADERS, "sass-loader"]
    }
  ];
};
const getTsRule = (options = {}) => {
  return  {
      test: /\.(ts|m?js)x?$/,
      exclude: {
        /* 排除node_modules目录 */
        and: [/node_modules/],
        not: [
          /node_modules[\\/]@atom/,
          /node_modules[\\/]tailwind-merge/,
          /node_modules[\\/]@radix-ui/
        ]
      },
      // use: ['babel-loader'],
      use: {
        loader: "babel-loader",
        options: getBabelConfig(options)
      }
    }
    
  // return {
  //   test: /\.(js|jsx|ts|tsx)$/,
  //   // exclude: /node_modules/,
  //   exclude: {
  //     /* 排除node_modules目录 */
  //     and: [/node_modules/],
  //     not: [
  //       /node_modules[\\/]@atom/,
  //       /node_modules[\\/]tailwind-merge/,
  //       /node_modules[\\/]@radix-ui/
  //     ]
  //   },
  //   use: {
  //     loader: "babel-loader",
  //     options: getBabelConfig(options.framework ? { framework: options.framework } : {})
  //   }
  // }
};
const getImgRule = () => ({
  test: /\.(png|jpe?g|gif|svg)$/i,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 20480,
        name: "[name].[ext]",
        esModule: false
      }
    }
  ]
});


const getRules = (options = {}) => [
  // 某些三方依赖中有 .mjs 文件，需要添加该规则进行处理，否则编译会报错
  {
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  },
  {
    test: /\.vue$/,
    use: ["vue-loader"]
  },
  getTsRule(options),
  ...getCssRule(options),
  getImgRule()
];

console.log('getRules - -- ', getTsRule({framework: 'react'}))


// const getCssRule = () => [
//   {
//     test: /\.css$/,
//     // ! 当sideEffects设置为true时，它表示该模块可能会影响模块外部的全局状态，例如添加全局变量或执行某些全局操作。
//     sideEffects: true,
//     use: [...CSS_LOADERS]
//   },
//   {
//     test: /\.less$/,
//     sideEffects: true,
//     use: [...CSS_LOADERS, "less-loader"]
//   },
//   {
//     test: /\.scss$/,
//     sideEffects: true,
//     use: [...CSS_LOADERS, "sass-loader"]
//   }
// ];

// const CSS_LOADERS =  getCssRule({framework: 'react'})
// console.log('CSS_LOADERS - -- ', CSS_LOADERS)

const WebpackBar = require("webpackbar");
function getPlugins() {
  const config = getCustomWebpack();
  const mode = index.getMode();
  const plugins = [
    new WebpackBar({ name: "Kingfisher-Matrix", color: index.GREEN }),
    new cleanWebpackPlugin.CleanWebpackPlugin(),
    new MatrixVersionWebpack__default()
  ];
  if (config.envSupport) {
    plugins.push(new EnvPlugin__default(mode));
  }
  if (!tools.isInCI()) {
    plugins.push(new FriendlyErrorsWebpackPlugin__default({ clearConsole: false, logLevel: "WARNING" }));
  }


  // plugins.push(new vueLoader.VueLoaderPlugin());
  
  return plugins;
}

function getWebpackBaseConfig(options) {
  const mode = index.getMode();
  const externals = {
    vue: {
      root: "Vue",
      amd: "vue",
      commonjs: "vue",
      commonjs2: "vue"
    },
    react: {
      root: "React",
      amd: "react",
      commonjs: "react",
      commonjs2: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      amd: "react-dom",
      commonjs: "react-dom",
      commonjs2: "react-dom"
    }
  };
  return {
    // target: "web",
    mode: index.Modes[mode] || "production",
    // ! 关闭所有输出信息，如果有报错，通过 webpack-plugin 插件处理
    // stats: 'none',
    // stats: 'errors-only',
    entry: "./index.ts",
    output: {
      filename: "index.js",
      path: path__namespace.resolve(index.PWD, "lib"),
      // library /* library 来指定全局变量名 */,
      libraryTarget: "umd",
      umdNamedDefine: true,
      // globalObject 指定一个字符串，该字符串表示在运行时用于创建全局变量的 JavaScript 表达式。这个配置项对于控制如何在浏览器中已经存在的全局对象中注入打包后的代码非常重要。
      // globalObject: "typeof self !== 'undefined' ? self : this"
    },
    externals,
    resolve: {
      extensions: [".tsx", ".jsx", ".ts", ".js", "mjs"],
      alias: { "@": path__namespace.resolve(index.PWD, "src") }
    },
    resolveLoader: {
      modules: [
        "node_modules",
        index.NODE_MODULES_PATH
      ]
    },
    //   module: {
    //     rules: getRules(options)
    //   },
    //   plugins: getPlugins()


    // };
    module: {
      rules: [
        // 某些三方依赖中有 .mjs 文件，需要添加该规则进行处理，否则编译会报错
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
        {
          test: /\.vue$/,
          use: ["vue-loader"]
        },
        // {
        //   test: /\.(ts|m?js)x?$/,
        //   exclude: {
        //     /* 排除node_modules目录 */
        //     and: [/node_modules/],
        //     not: [
        //       /node_modules[\\/]@atom/,
        //       /node_modules[\\/]tailwind-merge/,
        //       /node_modules[\\/]@radix-ui/
        //     ]
        //   },
        //   // use: ['babel-loader'],
        //   use: {
        //     loader: "babel-loader",
        //     options: getBabelConfig(options)
        //   }
        // },
        getTsRule({framework: 'react'}),
        ...getCssRule({framework: 'react'}),
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 20480,
                name: "[name].[ext]",
                esModule: false
              }
            }
          ]
        }
      ]
    },
    plugins: getPlugins()
  };
}

const getCustomWebpack = () => {
  let customWebpack = {};
  if (fs.existsSync(index.MATRIX_CONFIG_FILE)) {
    const config = require(index.MATRIX_CONFIG_FILE);
    if (typeof config === "function") {
      customWebpack = config() || {};
    } else if (typeof config === "object") {
      customWebpack = config;
    } else {
      customWebpack = {};
    }
  }
  return customWebpack;
};
function getWebpackConfig(options) {
  const baseWebpack = getWebpackBaseConfig(options);
  const customWebpack = getCustomWebpack();
  return webpackMerge.merge(baseWebpack, customWebpack.configureWebpack || {});
}

async function build(options) {
  const webpackConfig = getWebpackConfig(options);
  return new Promise((resolve, reject) => {
    webpack__default(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || stats.toString());
      } else {
        resolve(true);
      }
    });
  });
}

exports.build = build;
