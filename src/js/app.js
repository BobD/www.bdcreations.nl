import 'babel-polyfill';
import log from './utils/logger';
import SiteNavigation from './modules/site-navigation';
import ProjectNavigation from './modules/project-navigation';
import Projects from './modules/projects';

window.log = log;

document.addEventListener("DOMContentLoaded", function(e) {
	let siteNav = new SiteNavigation();
	let projectNav = new ProjectNavigation();
	let projects = new Projects();
	let introContainer =  document.querySelector("*[data-js='content']");
	let $body = document.querySelector("body");

	siteNav.on('mouseenter', (e) => {
		let mode = e.mode;
		$body.classList.add(`page--${mode}-mode`);
	});

	siteNav.on('mouseleave', (e) => {
		let mode = e.mode;
		$body.classList.remove(`page--${mode}-mode`);
	});

	projectNav.on('mouseenter', (e) => {
		introContainer.classList.add('expand');
		$body.classList.add('page--project-mode');

		projects.scrollTo(e.id, e.position);
	});

	projectNav.on('mouseleave', (e) => {
		introContainer.classList.remove('expand');
		$body.classList.remove('page--project-mode');

		projects.fadeOut();
	});
});