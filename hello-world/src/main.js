import * as THREE from 'three';

//creates a scene
const scene = new THREE.Scene();

//Create cube geometry
const cubeGeomenty = new THREE.BoxGeometry(1,1,1);

//create cube material
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

// console.log(cubeGeomenty);
// console.log(cubeMaterial)
//creates a cube
const cubeMesh = new THREE.Mesh(cubeGeomenty , cubeMaterial )

//adding mesh into scene
scene.add(cubeMesh);
// console.log(scene)

//Initialize camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight , 0.1,30);

//position of camera
camera.position.z = 5;

//adding camera into scene
scene.add(camera)

//initialize renderer
const canvas = document.querySelector('canvas.threejs')
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.render(scene, camera)