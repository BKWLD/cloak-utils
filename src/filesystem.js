/*
 * Utils for interacting with the filsystem in @cloak-app/boilerplate
 */
import { join } from 'path'
import { existsSync, readdirSync, lstatSync } from 'fs'

// Check if the src directory has a path.  Use like:
// srcHasFile("store/index.js")
export function srcHasPath(options, paths) {
	if (!Array.isArray(paths)) paths = [ paths ]
	return paths.find(path => {
		return existsSync(join(options.srcDir, path))
	})
}

// Get all the filenames in a directory
// https://stackoverflow.com/a/69929005/59160
export function getFilenames(path) {
	return readdirSync(path).filter(file => {
		return lstatSync(`${path}/${file}`).isFile()
	})
}
