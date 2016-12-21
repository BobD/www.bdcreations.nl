import Events from 'events';
import Tools from 'utils/tools';

class ScreenMode {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$html = document.querySelector('html');

		window.addEventListener('resize', () => {
			this.onWindowResize();
		});

		this.onWindowResize();
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}

	onWindowResize(){
		this.applyScreenMode();
		this.eventEmitter.emit('change', {
			mode:  this.getScreenMode()
		});
	}

	getScreenMode(){
		let modifiers = [];

		return {
			isMobile: this.isMobile(),
			isMobileiOS: this.isMobileiOS(),
			isTablet: this.isTablet(),
			isTabletLandscape: this.isTabletLandscape(),
			isTabletPortrait: this.isTabletPortrait(),
			isMinimal: (this.isMobile() || this.isTabletPortrait())
		}
	}

	isMobile(){
		let isMobile = window.matchMedia("only screen and (max-width: 736px)");

		return isMobile.matches;
	}

	isTablet(){
		let isTablet = window.matchMedia("only screen and (min-width: 768px) and (max-width: 1024px)");
		return isTablet.matches;
	}

	isTabletLandscape(){
		let isTablet = window.matchMedia("only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape)");
		return isTablet.matches;
	}

	isTabletPortrait(){
		let isTablet = window.matchMedia("only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait)");
		return isTablet.matches;
	}

	isMobileOrTablet(){
		let isMobileOrTablet = this.isMobile() || this.isTablet();
		return isMobileOrTablet;
	}

	isMobileiOS(){
		var userAgent = window.navigator.userAgent;
		return (userAgent.match(/iPhone/i)) != null;
	}

	isDesktop(){
		let mode = this.getScreenMode(); 
		return (!mode.isMobile && !mode.isTablet);
	}

	checkiOSversion() {
	  if (/iP(hone|od|ad)/.test(window.navigator.platform)) {
	    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
	    var v = (window.navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
	    return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	  }
	}

	applyScreenMode(){
		let mode = this.getScreenMode();
		Tools.toggleClass(this.$html, 'is-mobile', mode.isMobile);
		Tools.toggleClass(this.$html, 'is-ios', mode.isMobileiOS);
		Tools.toggleClass(this.$html, 'is-tablet', mode.isTablet);
		Tools.toggleClass(this.$html, 'is-tablet-landscape', mode.isTabletLandscape);
		Tools.toggleClass(this.$html, 'is-tablet-portrait', mode.isTabletPortrait);
		Tools.toggleClass(this.$html, 'is-tablet-minimal', mode.isMinimal);
		Tools.toggleClass(this.$html, 'is-desktop', (!mode.isMobile && !mode.isTablet));
	}

}

export default ScreenMode;