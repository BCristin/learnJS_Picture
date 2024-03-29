export default function accordion(triggersSelector, itemSelector) {
	const btns = document.querySelectorAll(triggersSelector);
	const blocks = document.querySelectorAll(itemSelector);
	blocks.forEach((block) => {
		block.classList.add("animated", "fadeInDown");
	});
	btns.forEach((btn) => {
		btn.addEventListener("click", function (e) {
			if (!this.classList.contains("active")) {
				btns.forEach((btn) => {
					btn.classList.remove("active", "active-style");
				});
				this.classList.add("active", "active-style");
			} else {
				this.classList.remove("active", "active-style");
			}
		});
	});
}
export function accordion2(triggersSelector) {
	const btns = document.querySelectorAll(triggersSelector);
	btns.forEach((btn) => {
		btn.addEventListener("click", function () {
			this.classList.toggle("active-style");
			this.nextElementSibling.classList.toggle("active-content");
			if (this.classList.contains("active-style")) {
				this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
			} else {
				this.nextElementSibling.style.maxHeight = "0px";
			}
			btns.forEach((btn) => {
				if (btn !== this) {
					btn.classList.remove("active-style");
					btn.nextElementSibling.classList.remove("active-content");
					btn.nextElementSibling.style.maxHeight = "0px";
				}
			});
		});
	});
}
