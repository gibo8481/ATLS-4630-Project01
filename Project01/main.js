/**
 * Resources: https://www.youtube.com/watch?v=YK1Sw_hnm58
 */

import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'


const gui = new dat.GUI(); // help with visualizing 3D properties
const world = {
  plane: {
    width: 10
  }
}
gui.add(world.plane, 'width', 1, 20).onChange(()=>{
    planeMesh.geometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, 10, 10, 10) // on change call back
}
// make to set the new position of all the vertices

); // min and max
 
/**
 * Perspective Camera: FOV, aspect ratio, near, far
 * FOV: extent of the scene that is seen on display
 * near and far: objects further away than the value of far or closer to near 
 * won't be rendered
 */
const fov = 75;
const aspect = innerHeight / innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer();
// const renderer = new THREE.WebGLRenderer({antialias: true, canvas}); // framework required to run 3D on the web

const scene = new THREE.Scene();

// console.log(scene);
// console.log(camera);
// console.log(renderer);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio); // renders clearly on other devices
document.body.appendChild(renderer.domElement);

/**
 * Add element
 * Geometry: wireframe of object, contains data relating to all the object's vertices
 * Material: painting up the faces
 * Geometry + material = mesh
 */
const bw = 1; // width
const bh = 1; // height
const bd = 1; // length/depth
const boxGeometry = new THREE.BoxGeometry(bw, bh, bd);

const col = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(col, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
const bMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00}); // affected by lights

// console.log(bMaterial);
// console.log(boxGeometry);
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const pMaterial = new THREE.MeshPhongMaterial({color: 0xff0000,
  side: THREE.DoubleSide
});
console.log(planeGeometry);

const box = new THREE.Mesh(boxGeometry, bMaterial);
const planeMesh = new THREE.Mesh(planeGeometry, pMaterial);
scene.add(planeMesh);
scene.add(box);
// console.log(box);
camera.position.z = 5;
// to see in 3D
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  box.rotation.x += 0.01; // rotations in radians
  box.rotation.y += 0.01;
}

animate();


const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
console.log(controls);
console.log(loader);
