module.exports = function override(config, env) {
    const preactAliases = {
        "react": "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils"
    };

    config.resolve.alias = {
        ...config.resolve.alias,
        ...preactAliases
    };

    return config;
};