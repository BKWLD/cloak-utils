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
