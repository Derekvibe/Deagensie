// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Disable Vue self-closing tag rules that conflict with Prettier
    'vue/html-self-closing': 'off',
  },
});
