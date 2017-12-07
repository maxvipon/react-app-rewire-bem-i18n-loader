# react-app-rewire-bem-i18n-loader

Add [`bem-i18n-loader`](https://github.com/Yeti-or/webpack-bem-i18n-loader) to a [`react-app-rewired`](https://github.com/timarney/react-app-rewired) config.

```js
const rewireBemI18N = require('react-app-rewire-bem-i18n-loader')

module.exports = {
	webpack: (config, env) => {
		// Add BEM I18N support
		config = rewireBemI18N(config, env);

		// ...other staff

		return config;
	}
};
```
