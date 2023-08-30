import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	// console log output
	//console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	document.getElementById("loading-icon-sword").remove();
	// console log output
	//console.log( 'Loading complete!');
};

manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	// console log output
	//console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError = function ( url ) {
	// console log output
	//console.log( 'There was an error loading ' + url );
};

let camera, scene, renderer;

init();
render();

function init() {
	const content = document.getElementById( 'content' );
	// This initiates the main 'div' element
	var mainContainer = document.createElement( 'div' );
	mainContainer.className = "container-fluid pt-3 pb-3";
	content.appendChild( mainContainer );
	// Add title to the artwork
	var title = document.createElement( 'h1' );
	title.innerHTML = "Sword of Exorcism";
	title.className = "display-5 text-center";
	mainContainer.appendChild( title );
	// This initiates the 'div' element containing the rendering canvas
	var container = document.createElement( 'div' );
	container.className = "container-fluid d-flex justify-content-center align-items-center";
	container.setAttribute("id", "sword");
	mainContainer.appendChild( container );
	// This initiates Loading 'img' 
	var loadingIcon = document.createElement( 'img' );
	loadingIcon.src = "Elements/cupertino_activity_indicator.gif";
	loadingIcon.setAttribute("id", "loading-icon-sword");
	loadingIcon.className = "loading-icon";
	document.getElementById("sword").appendChild(loadingIcon);

	camera = new THREE.PerspectiveCamera( 30, (window.innerWidth/2) / (window.innerHeight/2), 0.01, 20 );
	camera.position.set( -1, 0.5, 2 );

	scene = new THREE.Scene();

	new RGBELoader(manager)
		.setPath( 'Elements/3DModels/' )
		.load( 'colorful_studio_4k.hdr', function ( texture ) {

			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;

			render();

			// model
			const loader = new GLTFLoader(manager).setPath( 'Elements/3DModels/' );
			loader.load( 'CrownClownSOE.glb', function ( gltf ) {

				scene.add( gltf.scene );

				render();

			} );


		} );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( (window.innerWidth/2), (window.innerHeight/2) );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.useLegacyLights = false;
	container.appendChild( renderer.domElement );

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 0.1;
	controls.maxDistance = 5;
	controls.target.set( 0, 0.05, 0 );
	controls.update();

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
	camera.updateProjectionMatrix();

	renderer.setSize( (window.innerWidth/2), (window.innerHeight/2) );

	render();

}

//

function render() {

	renderer.render( scene, camera );

}