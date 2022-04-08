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
export function setDefaultOptions(moduleContainer, moduleName, defaults) {
	moduleContainer.options.cloak = {
		...moduleContainer.options.cloak,
		[moduleName]: {
			...defaults,
			...moduleContainer.options.cloak?.[moduleName],
		}
	}
}

// Combine setting default module options and then relaying those globally via
// publicRuntimeConfig
export function setPublicDefaultOptions(moduleContainer, moduleName, defaults) {
	setDefaultOptions(moduleContainer, moduleName, defaults)
	moduleContainer.options.publicRuntimeConfig.cloak = {
		...moduleContainer.options.publicRuntimeConfig.cloak,
		[moduleName]: moduleContainer.options.cloak[moduleName],
	}
}

// Combine setting default module options and then relaying those globally via
// privateRuntimeConfig
export function setPrivateDefaultOptions(moduleContainer, moduleName, defaults) {
	setDefaultOptions(moduleContainer, moduleName, defaults)
	moduleContainer.options.privateRuntimeConfig.cloak = {
		...moduleContainer.options.privateRuntimeConfig.cloak,
		[moduleName]: moduleContainer.options.cloak[moduleName],
	}
}
