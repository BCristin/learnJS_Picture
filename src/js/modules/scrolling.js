export default function scroll() {
	//#region  //?adaug elementele in pagina
	let up = document.createElement("div");
	up.innerHTML = `
   <a href="#up" class="pageup"><svg class="up" viewBox="0 0 26 26" fill="#fff" xmlns="http://www.w3.org/2000/svg">
   <path fill-rule="evenodd" clip-rule="evenodd" d="M26 0H0V26H26V0ZM4.6593 17.7519L13.1233 10.33L21.5873 17.7519L22.9059 16.2481L13.7826 8.24813L13.1233 7.67L12.464 8.24813L3.3407 16.2481L4.6593 17.7519Z" fill="black"/></svg></a>`;
	document.body.append(up);
	const style = document.createElement("style");
	style.innerHTML = `.pageup {opacity: 0;width: 26px ;height: 26px;position: fixed;bottom: 100px;
      right: 5%;z-index: 30;background-color: #fff;cursor: pointer;border: 1px solid white;transition: 1s all;}`;
	document.head.appendChild(style);
	document.querySelector("header").setAttribute("id", "up");
	//#endregion
	// afiseaza butonul dupa 1000 px scroll si il scoate pana la 1000
	const upE = document.querySelector(".pageup");
	window.addEventListener("scroll", () => {
		if (document.documentElement.scrollTop > 1000) {
			upE.classList.add("animated", "fadeIn");
			upE.classList.remove("fadeOut");
		} else {
			upE.classList.add("fadeOut");
			upE.classList.remove("fadeIn");
		}
	});

	const element = document.documentElement;
	const body = document.body;

	let allLinkId = document.querySelectorAll("[href]");

	allLinkId.forEach((item) => {
		item.addEventListener("click", function (e) {
			let scrollTop = Math.round(body.scrollTop || element.scrollTop);
			if (this.hash !== "") {
				// daca exista # rezulta true
				e.preventDefault();
				let hashElement = document.querySelector(this.hash);
				let hashElementTop = 0;
				while (hashElement.offsetParent) {
					// offsetParent arata elementul parinte <body>
					hashElementTop += hashElement.offsetTop; //offsetTop arata cati px sunt pana la top de la obiect
					hashElement = hashElement.offsetParent;
				}

				hashElementTop = Math.round(hashElementTop);
				smoothScroll(scrollTop, hashElementTop, this.hash);
			}
		});
	});
	const smoothScroll = (from, to, hash) => {
		let timeInterval = 1;
		let prevScrollTop, speed;
		if (to > from) {
			speed = 20;
		} else {
			speed = -20;
		}
		let move = setInterval(function () {
			let scrollTop = Math.round(body.scrollTop || element.scrollTop);
			if (prevScrollTop === scrollTop || (to > from && scrollTop >= to) || (to < from && scrollTop <= to)) {
				clearInterval(move);
				history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, "") /*+ hash*/);
			} else {
				body.scrollTop += speed;
				element.scrollTop += speed;
				prevScrollTop = scrollTop;
			}
		}, timeInterval);
	};

	// upE.addEventListener("click", function (e) {
	// 	e.preventDefault();
	// 	const scrollToTop = document.documentElement.scrollTop;
	// 	const interval = setInterval(() => {
	// 		if (document.documentElement.scrollTop <= 0) {
	// 			clearInterval(interval);
	// 		} else {
	// 			document.documentElement.scrollTop += -10;
	// 			console.log(document.documentElement.scrollTop);
	// 		}
	// 	}, 1);
	// });
}
function creaeBtn() {
	//#region  //?adaug elementele in pagina
	let up = document.createElement("div");
	up.innerHTML = `
<a href="#up" class="pageup"><svg class="up" viewBox="0 0 26 26" fill="#fff" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M26 0H0V26H26V0ZM4.6593 17.7519L13.1233 10.33L21.5873 17.7519L22.9059 16.2481L13.7826 8.24813L13.1233 7.67L12.464 8.24813L3.3407 16.2481L4.6593 17.7519Z" fill="black"/></svg></a>`;
	document.body.append(up);
	const style = document.createElement("style");
	style.innerHTML = `.pageup {opacity: 0;width: 26px ;height: 26px;position: fixed;bottom: 100px;
   right: 5%;z-index: 30;background-color: #fff;cursor: pointer;border: 1px solid white;transition: 1s all;}`;
	document.head.appendChild(style);
	document.querySelector("header").setAttribute("id", "up");
	//#endregion
}

export function scroll2() {
	creaeBtn();
	// afiseaza butonul dupa 1000 px scroll si il scoate pana la 1000
	const upE = document.querySelector(".pageup");
	window.addEventListener("scroll", () => {
		if (document.documentElement.scrollTop > 1000) {
			upE.classList.add("animated", "fadeIn");
			upE.classList.remove("fadeOut");
		} else {
			upE.classList.add("fadeOut");
			upE.classList.remove("fadeIn");
		}
	});

	let links = document.querySelectorAll(`[href^="#"]`);
	let speed = 0.2;
	links.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			let widthTop = document.documentElement.scrollTop;
			let hash = this.hash;
			let toBlock = document.querySelector(hash).getBoundingClientRect().top;
			let start = null;
			requestAnimationFrame(step);
			function step(time) {
				if (start === null) {
					start = time;
				}
				let progress = time - start;
				let r = toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock);
				document.documentElement.scrollTo(0, r);
				if (r != widthTop + toBlock) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;
				}
			}
		});
	});
}
