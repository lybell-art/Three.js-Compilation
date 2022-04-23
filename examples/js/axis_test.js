import * as THREE from './libs/three.module.js';

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.2, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});

const clock = new THREE.Clock();

function initLights()
{
	const ambientLight = new THREE.AmbientLight( 0x888888 );
//	scene.add( ambientLight );

	const light = new THREE.PointLight( 0xffffff, 65, 100, 2 );
	light.position.set( 50, 50, 50 );
	scene.add(light);


}

function initObjects()
{
	const geometry = new THREE.BoxGeometry( 10, 10, 10 );
	const material = new THREE.MeshPhongMaterial( {color: 0x24adaf, specular: 0x111111, shininess: 60} );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
}

function initRenderer()
{
	//renderer setting
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.getElementById("canvas").appendChild( renderer.domElement );
}

function initEventListeners()
{
	//set Event Listeners
	window.addEventListener( 'resize', onWindowResize );
}

function init()
{
	//scenes & camera settings
	scene.background = new THREE.Color(0x111111);
	camera.position.set(0, 20, 100);

	initLights();
	initObjects();

	initRenderer();
	initEventListeners();
}

function animate()
{
	requestAnimationFrame( animate );
	const deltaTime = Math.min( 0.1, clock.getDelta() );
	
	render();
}

function render()
{
	renderer.render(scene, camera);
}

init();
animate();


function onWindowResize() {

	mainCamera.aspect = window.innerWidth / window.innerHeight;
	mainCamera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}