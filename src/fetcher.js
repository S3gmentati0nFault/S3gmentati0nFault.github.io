const fetch = require("node-fetch");

export.handler = async(event) => {
	const token = process.env.GITHUB_KEY
	const owner = process.env.OWNER
	const repo = event.queryStringParameters.repo

	const query = `
		query($owner:String!, $name:String!) {
			repository(owner:$owner, name:$name) {
				object(expression:"HEAD:README.md") {
		  		... on Blob { text }
			}
	      	}
	}`;
	
	const r = await fetch(
		"https://api.github.com/graphql",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${token}`
			},
			body: JSON.stringify({ query, variables: { owner, name } })
		}
	);

	const data = await r.json();
	return {
		statusCode: 200,
		body: JSON.stringify(data)
	};
}
