import Events from 'events';
import Velocity from 'velocity-animate';
import _ from 'lodash';

class Pages {

	constructor(){
		this.eventEmitter = new Events.EventEmitter();
		this.$container = document.querySelector("*[data-js='pages__list']");
		this.$contentContainer = document.querySelector("*[data-js='content']");
		this.scrollToComplete = _.debounce(this.initPage.bind(this), 1000);
		this.currentIndex = 0;

		const $close =  document.querySelector("*[data-js='pages__close']");
		$close.addEventListener('click', (e) => {
			this.close();
			this.eventEmitter.emit('hide', {});
		});
	}

	on(){
		this.eventEmitter.on.apply(this.eventEmitter, arguments);
	}

	scrollTo(id){
		let $el = this.$container.querySelector(`*[data-id=${id}]`);
		let index = [].slice.call($el.parentNode.children).indexOf($el);
		let offset = index * -100;
		let dif = Math.abs(index - this.currentIndex);
		let baseSpeed = 500;
		let duration = baseSpeed;

		for(var a = 2; a < dif; ++a){
			duration += (baseSpeed / a);
		}

		this.clearPage();
		this.$container.classList.add('show');
		this.currentIndex = index;
		this.scrollToComplete.cancel();
		this.prepPage();

		Velocity(this.$container, {translateZ: 0, translateX: `${offset}%`}, {
			delay: 250, 
			duration: duration, 
			queue: false,
			complete: this.scrollToComplete
		});
	}

	clearPage(){
		const $page = this.$container.children[this.currentIndex];
		$page.classList.remove('active');
		$page.classList.remove('prep');

		this.scrollToComplete.cancel();
		this.$contentContainer.innerHTML = '';
	}

	prepPage(){
		const $page = this.$container.children[this.currentIndex];
		$page.classList.add('prep');
	}

	initPage(){
		const $page = this.$container.children[this.currentIndex];
		const $content = $page.querySelector("*[data-js='page__content']");

		if($content){
			const $contentClone = $content.cloneNode(true);
			Array.from($contentClone.children).forEach(($item) => {
				this.$contentContainer.appendChild($item);
			});
		}

		$page.classList.add('active');
	}

	close(){
		this.clearPage();
	}

}

export default Pages;