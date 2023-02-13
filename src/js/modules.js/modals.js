import calcScroll from "./calcScroll";
// import { validationCheckbox, validationInput } from "./validation";

const modals = () => {
	function bindModal(
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const window = document.querySelectorAll("[data-modal]");

		function closeAllModal() {
			window.forEach((item) => {
				item.style.display = "none";
			});
		}
		trigger.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
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
			if (e.target === modal && closeClickOverlay) {
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

	bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
	bindModal(
		".button-consultation",
		".popup-consultation",
		".popup-consultation .popup-close"
	);

	showModalbyTime(".popup-consultation", 60000);
};

export default modals;
