import * as THREE from 'three';
import { OrbitControls  } from 'three/examples/jsm/Addons.js';

console.log(OrbitControls);
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
    35,  //field of view - smaller the angle smaller the view. greater the angle larger the view
    window.innerWidth / innerHeight ,
    0.1, // Near 
    200  //far - How far the camera should show the object
  );

// const aspectRatio = window.innerWidth / window.innerHeight;

// const camera = new THREE.OrthographicCamera
// (
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   -1,
//   1,
//   .1,
//   200
// )

//position of camera
camera.position.z = 5;

//adding camera into scene
scene.add(camera)

//initialize renderer
const canvas = document.querySelector('canvas.threejs')
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias : true ,  //To avoid the antialising of corners.
})
const maxPixelRatio = Math.min(window.devicePixelRatio, 2)
renderer.setPixelRatio(maxPixelRatio)
//Instantiate the controls
const controls = new OrbitControls(camera, canvas)  //We can click and drag the view.
controls.enableDamping = true
// controls.autoRotate = true
const renderLoop = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()  //Needs to call after changing parameters.

  renderer.setSize(window.innerWidth , window.innerHeight)  //Setting size for the renderer
  controls.update()
  renderer.render(scene, camera)  //We are making a change and taking a snap.
  window.requestAnimationFrame(renderLoop)  // requestAnimationFrame - Function takes another function, right before you hit another frame call the this method.- we re-render the scene from the camera’s perspective on every frame
};

renderLoop()

window.addEventListener('resize' , () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})