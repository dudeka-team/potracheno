module.exports = {
    "extends": "airbnb",
    "rules": {
        "indent": ["error", "tab", {
            "SwitchCase": 1
        }],
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true
        }],
        "object-curly-spacing": ["error", "never"],
        "no-use-before-define": ["error", "nofunc"],
        "comma-dangle": ["error", "always-multiline"],
        "no-param-reassign": "off",
		"react/require-extension": "off"
    }
};
