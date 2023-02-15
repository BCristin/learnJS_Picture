export default function forms() {
	const form = document.querySelectorAll("form");
	const input = document.querySelectorAll("input");
	const upload = document.querySelectorAll("[name='upload']");
	const message = {
		loading: "Se trimite",
		success: "Multumim, forma a fost trimisa",
		failure: "Ceva nu a mers bine",
		spinner: "assets/img/spinner.gif",
		ok: "assets/img/ok.png",
		fail: "assets/img/fail.png",
	};
	const path = { designer: "assets/server.php", question: "assets/question.php" };

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			body: data,
		});
		return await res.text();
	};

	const clearInputs = () => {
		input.forEach((item) => {
			item.value = "";
		});
		upload.forEach((item) => {
			item.previousElementSibling.textContent = "Файл не выбран ";
		});
	};
	form.forEach((item) => {
		item.addEventListener("submit", (e) => {
			e.preventDefault();
			//creaza div-ul unde va fi mesajul
			let statusMessageDiv = document.createElement("div");
			statusMessageDiv.classList.add("status");
			//pune div-ul dupa forma
			item.parentNode.appendChild(statusMessageDiv);
			item.classList.add("animated", "fadeOutUp");

			//adaugam spinerul si mesajul de loading
			let statusImg = document.createElement("img");
			statusImg.setAttribute("src", message.spinner);
			statusImg.classList.add("animated", "fadeInUp");
			let textMessage = document.createElement("div");
			textMessage.textContent = message.loading;
			//scoate forma in 4ms
			setTimeout(() => {
				item.style.display = "none";
				statusMessageDiv.appendChild(statusImg);
				statusMessageDiv.appendChild(textMessage);
			}, 400);

			const formData = new FormData(item);
			let api;
			//cauta .popup-design la parinti
			item.closest(".popup-design") || item.classList.contains("calc_form") ? (api = path.designer) : (api = path.question);
			postData(api, formData)
				.then((res) => {
					console.log(res);
					statusImg.setAttribute("src", message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute("src", message.fail);
					statusMessageDiv.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessageDiv.remove();
						item.style.display = "block";
						item.classList.remove("fadeOutUp");
						item.classList.add("fadeInUp");
					}, 5000);
				});
		});
	});

	upload.forEach((item) => {
		item.addEventListener("input", () => {
			let dots;
			if (!item.files[0]) {
				item.previousElementSibling.textContent = "Файл не выбран ";
			} else {
				const arr = item.files[0].name.split(".");
				arr[0].length > 6 ? (dots = "_.") : (dots = ".");
				const name = arr[0].substring(0, 6) + dots + arr[arr.length - 1];
				item.previousElementSibling.textContent = name;
			}
		});
	});
}
