/*
 * Utils for interacting with assets
 */
import { requireLate } from './modules'
import defaultsDeep from 'lodash/defaultsDeep'

// Helper for using a defintions.styl file in a cloak-app package
export function addStyleResources(moduleContainer, path) {

	// Configure style-resources module to append package definitions
	defaultsDeep(moduleContainer.options, { styleResources: { stylus: [] }})
	moduleContainer.options.styleResources.stylus.push(path)

	// Add style-resources module late so other modules can append imports
	requireLate(moduleContainer, '@nuxtjs/style-resources')
}
