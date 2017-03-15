import 'babel-polyfill';
import log from './utils/logger';
import Navigation from './modules/navigation';
import Projects from './modules/projects';
import Pages from './modules/pages';

window.log = log;

document.addEventListener("DOMContentLoaded", function(e) {
	const navigation = new Navigation();
	const projects = new Projects();
	const pages = new Pages();
	const introContainer =  document.querySelector("*[data-js='content']");
	const $body = document.querySelector("body");

	// console.log(window.location.pathname);

	navigation.on('mouseenter', (e) => {
		pages.scrollTo(e.id);
		projects.open();
	});

	navigation.on('mouseleave', (e) => {
		const id = e.id;
	});

	projects.on('mouseenter', (e) => {
		pages.scrollTo(e.id);

		history.replaceState({

		}, null, e.id);
	});

	projects.on('mouseleave', (e) => {

	});

	$body.addEventListener('click', (e) => {
		projects.close();
		pages.close();
	});
});