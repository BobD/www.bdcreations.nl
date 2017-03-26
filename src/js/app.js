import 'babel-polyfill';
import Router from './utils/router';
import Logger from './utils/logger';
import Header from './components/header';
import Projects from './components/projects';
import Pages from './components/pages';

function ready(fn) {
  	if (document.readyState != 'loading'){
    	fn();
  	} else {
    	document.addEventListener('DOMContentLoaded', fn);
  	}
}

ready(function(e) {
	const logger = new Logger();
	const header = new Header();
	const projects = new Projects();
	const pages = new Pages();
	const router = new Router();

	router.on('/', () => {
		projects.close();
		pages.close();
	});

	router.on('/projects', ({id}) => {
		projects.trigger(id);
		pages.scrollTo(id);
	});

	projects.on('show', ({id}) => {
		router.setState(`/projects/${id}`);
	});

	pages.on('hide', (e) => {
		router.setState('/');
	});
});