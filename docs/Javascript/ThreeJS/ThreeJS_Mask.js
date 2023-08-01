import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera, scene, renderer;

init();
render();

function init() {
	// This initiates the 'div' element
	var container = document.createElement( 'div' );
	container.className = "container-fluid pt-3 pb-3"
	document.body.appendChild( container );
	// Add title to the artwork
	var title = document.createElement( 'h1' );
	title.innerHTML = "Crown Clown(Mask)";
	title.className = "display-5 text-center"
	container.appendChild( title );

	camera = new THREE.PerspectiveCamera( 30, (window.innerWidth/2) / (window.innerHeight/2), 0.01, 20 );
	camera.position.set( 0, 0.2, 0.5 );

	scene = new THREE.Scene();

	new RGBELoader()
		.setPath( 'Elements/3DModels/' )
		.load( 'colorful_studio_4k.hdr', function ( texture ) {

			texture.mapping = THREE.EquirectangularReflectionMapping;

			scene.background = texture;
			scene.environment = texture;

			render();

			// model

			const loader = new GLTFLoader().setPath( 'Elements/3DModels/' );
			loader.load( 'CrownClownMask.glb', function ( gltf ) {

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