import * as THREE from 'three';
import { OrbitControls  } from 'three/examples/jsm/Addons.js';
import { deltaTime } from 'three/tsl';

console.log(OrbitControls);
//creates a scene
const scene = new THREE.Scene();

//Create cube geometry
const cubeGeomenty = new THREE.BoxGeometry(1,1,1);

//create cube material
// const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});
 const cubeMaterial = new THREE.MeshBasicMaterial({color: "blue", wireframe: true});
 const cubeMaterial2 = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

// console.log(cubeGeomenty);
// console.log(cubeMaterial)
//creates a cube
const cubeMesh = new THREE.Mesh(cubeGeomenty , cubeMaterial )
// cubeMesh.position.y = 1


const cubeMesh2 = new THREE.Mesh(cubeGeomenty , cubeMaterial2 )
const cubeMesh3 = new THREE.Mesh(cubeGeomenty , cubeMaterial )
// cubeMesh2.position.x = 2
// cubeMesh.position.x = 1;
// cubeMesh3.position.x = -2

const group = new THREE.Group()
group.add(cubeMesh)
group.add(cubeMesh2)
group.add(cubeMesh3)

// scene.add(group)

group.position.y = 2
// group.scale.y = 2;

// cubeMesh.position.y = 1;
// cubeMesh.position.z = -1  //object3d is where Mesh properties are being inherited. position comes from vector 3d.
//adding mesh into scene
scene.add(cubeMesh);
// scene.add(cubeMesh2)

// cubeMesh.rotation.reorder('YXZ')   //always render in xyz axis inorder to make the order of rotation clear reorder is used
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(90) 
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(40) 

// cubeMesh.rotation.y = Math.PI * 0.5 //Math.PI = 180deg.  for 90deg, PI / 2.
//green stays the same other directions rotate. It rotates along the y axis.



// cubeMesh.scale.x = 3  //caling the mesh at x axis 3 times
// cubeMesh.scale.set(1,2,3) //Sets all three at once.



// const temp = new THREE.Vector3(0,1,0)
// cubeMesh.position.copy(temp)
// console.log(scene)

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper)

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

console.log(cubeMesh.position.distanceTo(camera.position))
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


window.addEventListener('resize' , () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const clock = new THREE.Clock()
let previousTIme = 0

const renderLoop = () => {

  //Animating the mesh
  let currentTime = clock.getElapsedTime()
  let delta = currentTime - previousTIme

  previousTIme = currentTime

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20

  // Math.sin()  // values oscillates between neg1 and pos 1
  cubeMesh.scale.x = (Math.sin(currentTime) * 20 + 2)
  // cubeMesh.position.x += 1 * delta

  // console.log(delta)
  // cubeMesh.rotation.x += THREE.MathUtils.degToRad(1)
  // cubeMesh.rotation.z += THREE.MathUtils.degToRad(1)

  // cubeMesh2.rotation.y -= THREE.MathUtils.degToRad(2)
  // cubeMesh2.rotation.x -= THREE.MathUtils.degToRad(2)
  // cubeMesh2.rotation.z += THREE.MathUtils.degToRad(2)

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()  //Needs to call after changing parameters.

  renderer.setSize(window.innerWidth , window.innerHeight)  //Setting size for the renderer



  controls.update()
  renderer.render(scene, camera)  //We are making a change and taking a snap.
  window.requestAnimationFrame(renderLoop)  // requestAnimationFrame - Function takes another function, right before you hit another frame call the this method.- we re-render the scene from the camera’s perspective on every frame
};

renderLoop()

