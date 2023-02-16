export default function showMoreStyles(trigger, styles) {
	const cards = document.querySelectorAll(styles);
	const btn = document.querySelector(trigger);

	// cards.forEach((card) => {
	// 	card.classList.add("animated", "fadeInUp");
	// });
	btn.addEventListener("click", function (e) {
		cards.forEach((card) => {
			card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");
			card.classList.add("animated", "fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
		});
		// btn.style.display = "none";
		btn.remove(); // sau
	});
}
