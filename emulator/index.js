async function postData(url = 'http://localhost:5000/tech/sensor/1', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

const $id = document.getElementById('id');
const $code = document.getElementById('code');
const $message = document.getElementById('message');
const $button = document.getElementsByTagName('button')[0];

$button.onclick = () => {
	postData(`http://localhost:5000/tech/sensor/${$id.value}`, {
		code: $code.value,
		message: $message.value
	})
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
}
