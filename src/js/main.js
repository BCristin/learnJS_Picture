import forms from "./modules.js/forms";
import modals from "./modules.js/modals";
import sliders from "./modules.js/sliders";

window.addEventListener("DOMContentLoaded", () => {
	"use strict";
	modals();
	sliders(".feedback-slider-item", "", ".main-prev-btn", ".main-next-btn");
	sliders(".main-slider-item", "vertical");
	forms();
});
