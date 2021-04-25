console.log("Client side JS");

// fetch("http://puzzle.mead.io/puzzle").then((res) => {
// 	res.json().then((data) => {
// 		console.log(data);
// 	});
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	messageOne.textContent = "";
	messageTwo.textContent = "";

	const location = search.value;

	if (!location) {
		messageOne.textContent = "Must submit a valid location!";
	} else {
		fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
			res.json().then((data) => {
				if (data.err) {
					messageOne.textContent = data.err;
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecast;
				}
			});
		});
	}

	// console.log(location);
});
