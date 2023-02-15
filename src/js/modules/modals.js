import calcScroll from "./calcScroll";

const modals = () => {
	let btnPresssed = false;
	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const window = document.querySelectorAll("[data-modal]");

		function closeAllModal() {
			window.forEach((item) => {
				item.style.display = "none";
				item.classList.add("animated", "fadeIn");
			});
		}
		trigger.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
				}
				btnPresssed = true;
				if (destroy) {
					item.remove();
				}
				closeAllModal();
				modal.style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${calcScroll()}px`;
			});
		});

		close.addEventListener("click", function () {
			closeAllModal();
			modal.style.display = "none";
			document.body.style.overflow = "";
			document.body.style.marginRight = `0px`;
		});
		modal.addEventListener("click", function (e) {
			if (e.target === modal) {
				closeAllModal();
				modal.style.display = "none";
				document.body.style.overflow = "";
				document.body.style.marginRight = `0px`;
			}
		});
	}
	function showModalbyTime(selector, time) {
		setTimeout(function () {
			let display;
			document.querySelectorAll("[data-modal]").forEach((item) => {
				if (getComputedStyle(item).display !== "none") {
					display = "block";
				}
			});
			if (!display) {
				document.querySelector(selector).style.display = "block";
				document.body.style.overflow = "hidden";
				document.body.style.marginRight = `${calcScroll()}px`;
			}
		}, time);
	}

	function openByScroll(selector) {
		window.addEventListener("scroll", () => {
			// console.log({
			// 	"document.documentElement.scrollHeight":
			// 		document.documentElement.scrollHeight,
			// 	"document.body.scrollHeight": document.body.scrollHeight,
			// 	btnPresssed: btnPresssed,
			// 	"window.pageYOffset": window.pageYOffset,
			// 	"document.documentElement.clientHeight":
			// 		document.documentElement.clientHeight,
			// });

			let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); // vede marimea pagini , total
			let scrollPas = window.pageYOffset; // cat scroll s-a facut deja
			let clientSees = document.documentElement.clientHeight; // ce vede clientul
			if (!btnPresssed && scrollPas + clientSees >= scrollHeight) {
				document.querySelector(selector).click();
			}
		});
	}

	bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
	bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
	bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
	openByScroll(".fixed-gift");
	showModalbyTime(".popup-consultation", 180000);
};

export default modals;
