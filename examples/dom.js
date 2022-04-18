import InfinityScroll from "/infinityScroll.js";

const sideContent = document.getElementById("aside-contents");
const scroller = new InfinityScroll(sideContent, 3);

scroller.initObserve();

function stateCheck(state, force)
{
	if(force === true) return true;
	if(force === false) return false;

	return !state;
}

function toggleElement(targetElem, defaultState=false)
{
	let state=defaultState;
	return function(force=null) {
		return function() {
			if( stateCheck(state, force) ) {
				targetElem.classList.add("show");
				state = true;
			}
			else {
				targetElem.classList.remove("show");
				state = false;
			}
		};
	};
}



function initButtons()
{
	const canvas = document.getElementById("canvas");
	function setButtonDomToggler(buttonID, targetSelector, defaultState=false)
	{
		const button = document.getElementById(buttonID);
		const target = document.querySelector(targetSelector);
		if(!button || !target) return;

		const toggler = toggleElement(target, defaultState);

		button.addEventListener("click", toggler());
		canvas.addEventListener("click", toggler(defaultState));
	}

	setButtonDomToggler("list-button", ".showcase-list", false);
	setButtonDomToggler("description-button", ".showcase-desc-box", false);
	setButtonDomToggler("description-button", ".bottom-nav", true);
}

initButtons();