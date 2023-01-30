// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };



module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      // 'babel-plugin-styled-components',
      [
        'module:react-native-dotenv',
        {
          // envName: "API_URI",
          API_URI: '@env',
          moduleName: "@env",
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false
        },
      ],
      ["babel-plugin-styled-components"],
    ],
  };
};