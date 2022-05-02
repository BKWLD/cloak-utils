/*
 * Helpers for interacting with gql
 */
const { createFsFromVolume, Volume } = require('memfs')
const webpack = require('webpack')
const { removeSlashes } = require('slashes')

// Load a GQL file using the webpack-graphql-loader. This follows the pattern
// shown on https://webpack.js.org/api/node/#custom-file-systems
export function loadGql(path) {

	// Setup
	const fs = createFsFromVolume(new Volume())
	const compiler = webpack({
		mode: 'none',
		entry: { gql: path },
		module: { rules: [ {
			test: /\.gql?$/,
			loader: 'webpack-graphql-loader',
		}]}
	})
	compiler.outputFileSystem = fs;

	// Build with webpack
	return new Promise((resolve, reject) => {
		compiler.run(async (err, stats) => {
			if (err) return reject(err)

			// The emitted file will be a JS file with a `module.exports=""` that
			// contains the GQL string. `eval()` lets us get that string value.
			const gqlJsString = fs.readFileSync('dist/gql.js', 'utf8')

			// Use regeex to get the GQL from the Webpack output. I tried to eval
			// the JS string or require this file but had no luck with that.
			// https://regex101.com/r/3WkcqH/1
			const matches = gqlJsString.match(/^module\.exports\s*=\s*\"(.+)\"$/m)
			if (!matches) throw `GQL could not be parsed out of ${path}`
			const gqlString = removeSlashes(matches[1])

			// Return the string content once webpack is finished
			compiler.close((closeErr) => {
				if (closeErr) return reject(closeErr)
				resolve(gqlString)
			})
		})
	})
}
