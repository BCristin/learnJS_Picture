const filter = () => {
	const menu = document.querySelector(".portfolio-menu");
	const items = menu.querySelectorAll("li");
	const wrapper = document.querySelector(".portfolio-wrapper");
	const markAll = wrapper.querySelectorAll(".all");
	const no = document.querySelector(".portfolio-no");
	const typeFilter = (markType) => {
		markAll.forEach((mark) => {
			mark.style.display = "none";
			mark.classList.remove("animated", "fadeIn");
		});
		no.style.display = "none";
		no.classList.remove("animated", "fadeIn");

		if (markType.length > 0) {
			markType.forEach((mark) => {
				mark.style.display = "block";
				mark.classList.add("animated", "fadeIn");
			});
		} else {
			no.style.display = "block";
			no.classList.add("animated", "fadeIn");
		}
	};

	menu.addEventListener("click", (e) => {
		let target = e.target;
		if (target && target.tagName == "LI") {
			items.forEach((btn) => btn.classList.remove("active"));
			target.classList.add("active");
		}
	});

	function filterFn(...args) {
		args.forEach((name) => {
			const btn = menu.querySelector(name);
			const mark = wrapper.querySelectorAll(name);
			btn.addEventListener("click", () => {
				typeFilter(mark);
			});
		});
	}

	filterFn(".all", ".lovers", ".chef", ".girl", ".guy", ".grandmother", ".granddad");
};
export default filter;
