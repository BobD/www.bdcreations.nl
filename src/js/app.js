import 'babel-polyfill';
import log from './utils/logger';
import SiteNavigation from './modules/site-navigation';
import ProjectNavigation from './modules/project-navigation';
import Projects from './modules/projects';

window.log = log;

document.addEventListener("DOMContentLoaded", function(e) {
	let siteNav = new SiteNavigation();
	let projectNav =new ProjectNavigation();
	let projects =new Projects();
	let introContainer =  document.querySelector("*[data-js='intro']");
	log(introContainer);

	projectNav.on('mouseenter', (projectId) => {
		introContainer.classList.add('expand');
		projects.scrollTo(projectId);
	});

	projectNav.on('mouseleave', (projectId) => {
		introContainer.classList.remove('expand');
		projects.fadeOut();
	});
});