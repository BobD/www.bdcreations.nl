import 'babel-polyfill';
import log from './utils/logger';
import Header from './modules/header';
import Projects from './modules/projects';
import Pages from './modules/pages';

window.log = log;

document.addEventListener("DOMContentLoaded", function(e) {
	const header = new Header();
	const projects = new Projects();
	const pages = new Pages();
	const introContainer =  document.querySelector("*[data-js='content']");
	const $body = document.querySelector("body");

	// console.log(window.location.pathname);

	log(pages);

	header.on('show', ({id}) => {
		pages.scrollTo(id);
		projects.open();
	});

	header.on('hide', ({id}) => {
		projects.close();
		pages.close();
	});

	projects.on('show', (e) => {
		pages.scrollTo(e.id);

		history.replaceState({
		}, null, e.id);
	});

	pages.on('hide', (e) => {
		log('test');
		projects.close();
	});
});