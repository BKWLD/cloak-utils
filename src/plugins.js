/*
 * Helpers for working with Nuxt plugins
 */

// Add a plugin after the existingPlugin in the plugins array, designed to be
// used from extendPlugins(). `existingPlugin` is string; part of the existing
// plugin name.
export function addPluginAfter(plugins, existingPlugin, plugin) {

	// Support object or string plugin definitions
	const pluginIndex = plugins.findIndex(
		plugin => (plugin.src || plugin).includes(existingPlugin)
	)
	if (pluginIndex == -1) throw `existingPlugin ${existingPlugin} not found`

	// Add the plugin
	plugins.splice(pluginIndex + 1, 0, plugin)
	return plugins
}
