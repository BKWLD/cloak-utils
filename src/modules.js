/*
 * Helpers for working with Nuxt modules
 */

// Actually only require a module once, since Nuxt's requireModule doesn't
// do this anymore
// https://github.com/nuxt/nuxt.js/blob/853439ddf945b6ee358d5912e6e5a68009633c27/packages/core/src/module.js#L129
export function requireOnce(moduleContainer, moduleName) {
	if (!moduleContainer.requiredModules[moduleName]) {
		moduleContainer.requireModule(moduleName)
	}
}

// Setting default module options
export function setDefaultOptions(options, moduleName, defaults) {
	options.cloak = {
		...options.cloak,
		[moduleName]: {
			...defaults,
			...this.options.cloak?[moduleName],
			...options.cloak?.[moduleName],
		}
	}
}

// Combine setting default module options and then relaying those globally via
// publicRuntimeConfig
export function setPublicDefaultOptions(options, moduleName, defaults) {
	setDefaultOptions(options, moduleName, defaults)
	options.publicRuntimeConfig.cloak = {
		...this.options.publicRuntimeConfig.cloak,
		[moduleName]: this.options.cloak[moduleName],
	}
}

// Combine setting default module options and then relaying those globally via
// privateRuntimeConfig
export function setPrivateDefaultOptions(options, moduleName, defaults) {
	setDefaultOptions(options, moduleName, defaults)
	options.privateRuntimeConfig.cloak = {
		...this.options.privateRuntimeConfig.cloak,
		[moduleName]: this.options.cloak[moduleName],
	}
}
