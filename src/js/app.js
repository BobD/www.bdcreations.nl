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
		$body.classList.add(`app--${mode}-mode`);
	});

	siteNav.on('mouseleave', (e) => {
		let mode = e.mode;
		$body.classList.remove(`app--${mode}-mode`);
	});

	projectNav.on('mouseenter', (e) => {
		// introContainer.classList.add('expand');
		projects.scrollTo(e.id, e.position);
	});

	projectNav.on('mouseleave', (e) => {
		// introContainer.classList.remove('expand');
		projects.fadeOut();
	});
});