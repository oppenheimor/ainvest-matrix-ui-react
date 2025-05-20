// module.exports = {
//   configureWebpack: {
//     module: {
//       rules: [
//         {
//           test: /\.(ts|js)x?$/,
//           exclude: {
//             and: [/node_modules/]
//           },
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 [
//                   '@vue/babel-preset-app',
//                   {
//                     targets: {
//                       browsers: ['Android >= 5', 'safari >= 7']
//                     },
//                     useBuiltIns: 'usage'
//                   }
//                 ],
//                 ['@babel/preset-typescript', { allExtensions: true }]
//               ],
//               plugins: [
//                 '@babel/plugin-proposal-class-properties',
//                 '@babel/plugin-proposal-optional-chaining',
//                 '@babel/plugin-proposal-export-default-from',
//                 '@babel/plugin-proposal-export-namespace-from'
//               ]
//             }
//           }
//         }
//       ]
//     }
//   }
// };

module.exports = {
}