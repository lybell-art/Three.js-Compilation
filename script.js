const mainContent = document.getElementById("main-contents");
const nextLoader = document.getElementById("nextLoader");
let shownCount = 0;
let elementRows = 3;

function getExamplesData()
{
	const response = fetch("./examples/exampleList.json");
	return response.then((res)=>res.json()).catch((e)=>[]);
}

function addContents({link, thumbnail, title, description}={}, parent)
{
	const content=document.createElement("div");
	content.classList.add("project");
	content.classList.add("additional");
	content.insertAdjacentHTML('beforeend', 
		`<a href="${link}">
			<img class="thumbnail" src="${thumbnail}" />
			<div class="description-box">
				<h3>${title}</h3>
				<p class="description">${description}</p>
			</div>
		</a>`);

	parent.appendChild(content);
}

async function infinityScroll()
{
	let examplesData;
	examplesData = await getExamplesData();
	const maxExamples = examplesData.length;

	let options = {
		rootMargin: '0px 0px 50px 0px',
		threshold: 0.5
	};

	function loadMore([{ isIntersecting, target }], observer)
	{
		if (isIntersecting){
			let i=shownCount % elementRows;
			let dummyParent = document.createDocumentFragment();
			while(i < elementRows && shownCount < maxExamples){
				addContents(examplesData[shownCount], dummyParent);
				shownCount++;
				i++;
			}
			mainContent.appendChild(dummyParent);
		}
		if (shownCount >= maxExamples) observer.unobserve(target);
	}

	const observer = new IntersectionObserver(loadMore, options);
	observer.observe(nextLoader);
}

function resetElementRows()
{
	let clientWidth = document.body.clientWidth;
	const ElementMarginWidth = 384 + (16 * 2);
	let rows = clientWidth / ElementMarginWidth;
	if(rows < 2) elementRows=1;
	else if(rows < 3) elementRows=2;
	else elementRows=3;
}

resetElementRows();
window.addEventListener("resize", resetElementRows);
infinityScroll();