/*
 * Helpers for working with Axios
 */
import MockAdapter from 'axios-mock-adapter'

// Apply mocks to the provided axios instance. Mocks is an array of:
// - query: Text found in the `query` payload, usually query name
// - variables: Variables to exact match in the paylod
// - response: Object that should be returned on match
export function mockAxiosGql(client, mocks) {

	// Make mock instance
	const mock = new MockAdapter(client)

	// Listen to all requests...
	mock.onAny().reply(config => {
		const payload = JSON.parse(config.data)

		// Loop through mocks...
		const match = mocks.find(({ query, variables }) => {

			// Check that the query contains the `query` value...
			if (!payload.query.includes(query)) return false

			// Check that all variables match...
			for (const [key, value] of Object.entries(variables)) {
				if (payload.variables[key] != value) return false
			}

			// Checks out
			return true
		})

		// Return success response
		if (match) return [200, match.response]

		// A request didn't match expectations
		throw `Unexepcted request for mock: ${query.payload}, ${query.variables}`
	})

}
