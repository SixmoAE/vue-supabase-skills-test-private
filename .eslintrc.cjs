/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript", "plugin:prettier/recommended"],
    plugins: ["simple-import-sort", "import"],
    overrides: [
        {
            files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
            extends: ["plugin:playwright/recommended"],
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "linebreak-style": "off",
        indent: ["error", 4],
        "vue/html-indent": ["error", 4],
        "vue/script-indent": ["error", 4],
        "vue/html-quotes": ["error", "double"],
        "vue/no-unused-vars": "error",
        "vue/multi-word-component-names": "off",
        quotes: ["error", "double"],
        semi: ["error", "always"],
        // 'no-console': 'error',
        "no-debugger": "error",
        // 'no-undef': 'error',
        "no-async-promise-executor": "off",
        "prettier/prettier": [
            "error",
            {
                semi: true,
                singleQuote: false,
                tabWidth: 4,
                printWidth: 130,
            },
        ],
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    // Group 1. Any path with "component" or "components" in it.
                    [".*_?components?_?.*", ".*\\.vue$", ".*radix.*", ".*lucide.*", "."],
                    // Group 2. All other imports
                    [".*"],
                ],
            },
        ],
        "simple-import-sort/exports": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
    },
};
