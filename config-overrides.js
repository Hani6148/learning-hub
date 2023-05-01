const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  // Copy the worker files from the ace-builds package to the public folder
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/ace-builds/src-noconflict',
          to: 'static/js',
          globOptions: {
            ignore: ['**/*.+(css|html|txt)'],
          },
        },
      ],
    })
  );

  return config;
};
