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
	});

	navigation.on('mouseleave', (e) => {
		let mode = e.mode;
	});

	projects.on('mouseenter', (e) => {
		pages.scrollTo(e.id, e.position);

		history.replaceState({

		}, null, e.id);
	});

	projects.on('mouseleave', (e) => {
		// pages.fadeOut();
	});

	let body = document.querySelector("body");
	body.addEventListener('click', (e) => {
		projects.close();
	});
});