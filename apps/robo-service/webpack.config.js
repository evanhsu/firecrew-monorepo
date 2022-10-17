// Helper for combining webpack config objects
// const { merge } = require('webpack-merge');

module.exports = (config, context) => {
    // config = merge(config, {
    //     plugins: [
    //         new ForkTsCheckerWebpackPlugin({
    //             async: true,
    //         }),
    //     ],
    // });

    // For development we don't want typechecking to be blocking...
    if (config.mode === 'development') {
        // So we set the ForkTsCheckerWebpackPlugin async option to true
        // This way if typechecking fails, it fails in a separate process and doesn't block the build
        config.plugins[0].options.async = true;
    }

    //   console.log(config.resolve);

    return config;
};
