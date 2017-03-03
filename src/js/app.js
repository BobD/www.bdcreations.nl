import 'babel-polyfill';
import log from './utils/logger';
import Navigation from './modules/navigation';
import Projects from './modules/projects';
import Pages from './modules/pages';

window.log = log;

document.addEventListener("DOMContentLoaded", function(e) {
	let navigation = new Navigation();
	let projects = new Projects();
	let pages = new Pages();
	let introContainer =  document.querySelector("*[data-js='content']");
	let $body = document.querySelector("body");

	navigation.on('mouseenter', (e) => {
		let mode = e.mode;
		// $body.classList.add(`app--${mode}-mode`);
	});

	navigation.on('mouseleave', (e) => {
		let mode = e.mode;
		// $body.classList.remove(`app--${mode}-mode`);
	});

	projects.on('mouseenter', (e) => {
		pages.scrollTo(e.id, e.position);
	});

	projects.on('mouseleave', (e) => {
		pages.fadeOut();
	});
});