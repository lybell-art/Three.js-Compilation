function getExamplesData(trimIndex)
{
	const response = fetch("/examples/exampleList.json");
	return response.then((res)=>res.json())
		.catch((e)=>[])
		.then((arr)=>arr.splice(trimIndex));
}
function addContent({link, thumbnail, title, description}={}, parent)
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

class InfinityScroll
{
	constructor(box, preShownElems=6)
	{
		this.shownCount = 0;
		this.elementRows = 1;

		this.preShownElems = preShownElems;
		this.scrollComponent = box;

		this.nextLoader = document.createElement("div");
		this.nextLoader.id = "nextLoader";
		box.after(this.nextLoader);
	}
	addContents(data)
	{
		const dataLength = data.length;
		const dummyParent = document.createDocumentFragment();

		let i=this.shownCount % this.elementRows;
		while(i < this.elementRows && this.shownCount < dataLength){
			addContent(data[this.shownCount], dummyParent);
			this.shownCount++;
			i++;
		}

		this.scrollComponent.appendChild(dummyParent);
	}
	async initObserve()
	{
		const examplesData = await getExamplesData(this.preShownElems);
		const maxExamples = examplesData.length;

		const options = {
			rootMargin: '0px 0px 50px 0px',
			threshold: 0.5
		};

		const loadMore=([{ isIntersecting, target }], observer)=>
		{
			if (isIntersecting) this.addContents(examplesData);
			if (this.shownCount >= maxExamples) observer.unobserve(target);
		};

		const observer = new IntersectionObserver(loadMore, options);
		observer.observe(this.nextLoader);
	}
	resetElementRows()
	{
		const CONTENT_WIDTH = 384;
		const CONTENT_MARGIN = 16

		const clientWidth = document.body.clientWidth;
		const ElementMarginWidth = CONTENT_WIDTH + (CONTENT_MARGIN * 2);

		let rows = clientWidth / ElementMarginWidth;
		if(rows < 2) this.elementRows=1;
		else if(rows < 3) this.elementRows=2;
		else this.elementRows=3;
	}
}

export default InfinityScroll;