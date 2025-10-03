const fetch = require("node-fetch");

exports.handler = async (event) => {
	const token = process.env.GITHUB_KEY
	const owner = process.env.OWNER
	const repo = event.queryStringParameters.repo

	const query = `
	  query {
	    repository(owner: "$owner", name: "$repo") {
	      object(expression: "main:README.md") {
		... on Blob {
		  text
		}
	      }
	    }
	  }
	`;
	
	const r = await fetch(
		"https://api.github.com/graphql",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer $token`
			},
			body: JSON.stringify({ query })
		}
	);

	const data = await r.json();
	console.log(JSON.stringify(data))
	console.log(r.status)
	return {
		statusCode: r.status,
		body: JSON.stringify(data)
	};
}




github();
