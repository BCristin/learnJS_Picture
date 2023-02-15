export default function sliders(slides, dir, prev, next, slideIndex = 1) {
	const items = document.querySelectorAll(slides); // itemele din slider
	function showSlides(n) {
		if (n > items.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = items.length;
		}
		// scoate toate slidere
		items.forEach((item) => {
			item.classList.add("animated");
			item.style.display = "none";
		});
		// adauga sliderul trimis
		items[slideIndex - 1].style.display = "block";
	}
	showSlides(slideIndex);

	function plusSlides(n) {
		showSlides((slideIndex += n));
	}

	try {
		const prevBtn = document.querySelector(prev);
		const nextBtn = document.querySelector(next);

		prevBtn.addEventListener("click", () => {
			plusSlides(-1);
			items[slideIndex - 1].classList.remove("slideInLeft");
			items[slideIndex - 1].classList.add("slideInRight");
		});

		nextBtn.addEventListener("click", () => {
			plusSlides(1);
			items[slideIndex - 1].classList.remove("slideInRight");
			items[slideIndex - 1].classList.add("slideInLeft");
		});
	} catch (e) {}

	let paused = false;
	function activateAnimation() {
		paused = setInterval(() => {
			plusSlides(1);
			if (dir === "vertical") {
				items[slideIndex - 1].classList.add("slideInDown");
			} else {
				items[slideIndex - 1].classList.remove("slideInRight");
				items[slideIndex - 1].classList.add("slideInLeft");
			}
		}, 5000);
	}
	activateAnimation();

	items[0].parentNode.addEventListener("mouseenter", () => {
		clearInterval(paused);
	});
	items[0].parentNode.addEventListener("mouseleave", () => {
		activateAnimation();
	});
}
