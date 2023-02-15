export default function checkTextInputs(selector) {
	const txtInputs = document.querySelectorAll(selector);
	txtInputs.forEach((input) => {
		input.addEventListener("keypress", function (e) {
			if (e.key.match(/[^a-zăâîșț0-9\-\_\.\s]/gi)) {
				e.preventDefault();
			}
		});
	});
}
