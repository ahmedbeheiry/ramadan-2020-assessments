const vidoeForm = document.getElementById('video_form');
const submitBtn = document.getElementById('submit_btn');
const url = 'http://localhost:7777/video-request';
const formValues = {};

submitBtn.addEventListener('click', function (e) {
	e.preventDefault();
	const formElements = vidoeForm.elements;

	for (let i = 0; i < formElements.length; i++) {
		const item = formElements.item(i);
		formValues[item.name] = item.value;
	}

	postVideo(url, formValues)
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
});

async function postVideo(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return response.json();
}
