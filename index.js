const path = require('path');

/**
 * @param {Object} rule
 * @return {Array}
 */
const ruleChildren = rule =>
	rule.use || rule.oneOf || (Array.isArray(rule.loader) && rule.loader) || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
	let result;
	const rules = Array.isArray(rulesSource) ?
		rulesSource :
		ruleChildren(rulesSource);

	/* eslint no-return-assign: "off" */
	rules.some((rule, index) =>
		(result = ruleMatcher(rule) ?
			{index, rules} :
			findIndexAndRules(ruleChildren(rule), ruleMatcher)));

	return result;
};

/**
 * Given a rule, return if it uses a specific loader.
 */
const createLoaderMatcher = loader => rule =>
	rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;

/**
* Get the existing file-loader config.
*/
const fileLoaderMatcher = createLoaderMatcher('file-loader');

/**
* Add one rule before another in the list of rules.
*/
const addBeforeRule = (rulesSource, ruleMatcher, value) => {
	const {index, rules} = findIndexAndRules(rulesSource, ruleMatcher);
	rules.splice(index, 0, value);
};

function rewireBemI18N(config, env, i18nLoaderOptions = {}) {
	const i18nExtension = /\.i18n\//;

	const i18nRules = {
		test: i18nExtension,
		loader: 'webpack-bem-i18n-loader',
		options: i18nLoaderOptions
	};

	// Add the BEM I18N rule before the file-loader rule.
	addBeforeRule(config.module.rules, fileLoaderMatcher, i18nRules);

	return config;
}

module.exports = rewireBemI18N;
