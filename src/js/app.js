import 'babel-polyfill';
import Router from 'utils/router';
import Logger from './utils/logger';
import Header from './components/header';
import Projects from './components/projects';
import Pages from './components/pages';
import Information from './components/information';

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
	const information = new Information();

	Router.on('/', () => {
		projects.close();
		pages.close();
	});

	Router.on('/projects', ({id}) => {
		const itemIsClosed = projects.trigger(id);
		if(!itemIsClosed){
			pages.scrollTo(id);
		}
	});

	Router.on('/about', () => {
		information.open();
	});

	Router.init();
});