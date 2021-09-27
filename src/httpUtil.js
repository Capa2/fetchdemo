function makeOptions(method, body) {
	var opts = {
		method: method,
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
		},
	};
	if (body) {
		opts.body = JSON.stringify(body);
	}
	return opts;
}

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject({ status: res.status, fullError: res.json() });
	}
	return res.json();
}

function errCatch(err) {
	if (err.status) {
		err.fullError.then((e) => console.log(e.msg));
	} else {
		console.log("Network error");
	}
}

const httpUtil = {
	makeOptions,
	handleHttpErrors,
	errCatch,
};

export default httpUtil;
