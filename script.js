import InfinityScroll from "/infinityScroll.js";

const mainContent = document.getElementById("main-contents");
const scroller = new InfinityScroll(mainContent, 6);

scroller.resetElementRows();
window.addEventListener("resize", scroller.resetElementRows);
scroller.initObserve();