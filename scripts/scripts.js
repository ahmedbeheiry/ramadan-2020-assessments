const api_url = 'http://localhost:7777/video-request';

document.addEventListener('DOMContentLoaded', function() {
	const vidoeForm = document.getElementById('video_form');
	const videosListElm = document.getElementById('listOfRequests');

	// Render Videos
	getVideos().then(videos => {
		videos.forEach(video => {
			videosListElm.appendChild(createVideoTemp(video));
		});
	});

	// Post Video Form
	vidoeForm.addEventListener('submit', function (e) {
		e.preventDefault();
		const formValues = {};
		const formElements = vidoeForm.elements;
	
		for (let i = 0; i < formElements.length; i++) {
			const item = formElements.item(i);
			formValues[item.name] = item.value;
		}
	
		postVideo(api_url, formValues)
			.then((video) => {
				console.log(video);
				videosListElm.prepend(createVideoTemp(video));
			})
			.catch((error) => {
				console.log(error);
			});
	});
});

async function renderVideos() {
	const videos = await getVideos();
	console.log('Videos', videos);
	return videos;
}

async function postVideo(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});

	return response.json();
}

async function getVideos() {
	const response = await fetch(api_url);
	return response.json();
}

function createVideoTemp(video) {
	const vidContainerElm = document.createElement('div');
	vidContainerElm.className = 'card mb-3';
	vidContainerElm.innerHTML = `
		<div class="card-body d-flex justify-content-between flex-row">
			<div class="d-flex flex-column">
				<h3>${video.topic_title}</h3>
				<p class="text-muted mb-2">${video.topic_details}</p>
				<p class="mb-0 text-muted">
				<strong>Expected results:</strong> ${video.expected_result}
				</p>
			</div>
			<div class="d-flex flex-column text-center">
				<a class="btn btn-link">&#8593;</a>
				<h3>0</h3>
				<a class="btn btn-link">&#8595;</a>
			</div>
			</div>
			<div class="card-footer d-flex flex-row justify-content-between">
			<div>
				<span class="text-info">${video.status}</span>
				&bullet; added by <strong>${video.author_name}</strong> on
				<strong>${new Date(video.submit_date).toLocaleDateString()}</strong>
			</div>
			<div
				class="d-flex justify-content-center flex-column 408ml-auto mr-2"
			>
				<div class="badge badge-success">
					${video.target_level}
				</div>
			</div>
		</div>
	`;

	return vidContainerElm;

}