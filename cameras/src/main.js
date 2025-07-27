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
const camera = new THREE.PerspectiveCamera
  (
    75,  //field of view - smaller the angle smaller the view. greater the angle larger the view
    window.innerWidth / innerHeight ,
    0.00000000001, // Near 
    2000  //far - How far the camera should show the object
  );

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
renderer.setSize(window.innerWidth , window.innerHeight)  //Setting size for the renderer
renderer.render(scene, camera)