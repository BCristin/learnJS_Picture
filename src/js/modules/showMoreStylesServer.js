import { getResource } from "../services/requests";

export default function showMoreStylesServer(trigger, wrapper) {
	const btn = document.querySelector(trigger);
	btn.addEventListener("click", function () {
		getResource("http://localhost:3000/styles")
			.then((res) => createCards(res))
			.catch((error) => console.log(error));
		this.remove();
	});

	function createCards(response) {
		response.forEach(({ src, title, link }) => {
			let card = document.createElement("div");

			card.innerHTML = `
         <div class="animated fadeInDown col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1">
            <div class="styles-block">
               <img src=${src} alt="style">
               <h4>${title}</h4>
               <a href=${link}>Подробнее</a>
            </div>
         </div>
         `;
			document.querySelector(wrapper).appendChild(card);
		});
	}
}
