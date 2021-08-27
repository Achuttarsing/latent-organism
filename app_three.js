// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
// Create an empty scene
var scene = new THREE.Scene();
// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 40;
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});
// Configure renderer clear color
renderer.setClearColor("#000000");
// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------
// Create a Cube Mesh with basic material
const geometry = new THREE.BoxGeometry(20, 20, 20, 20, 20, 20); 
const material = new THREE.MeshNormalMaterial({ wireframe: true }); 
const cube = new THREE.Mesh(geometry, material); 
scene.add(cube);

// FLEXION : TWIST()
const quaternion = new THREE.Quaternion(); 
quaternion.setFromAxisAngle( 
  new THREE.Vector3(0, 1, 0), 
  Math.PI / 2 
);  
const vector = new THREE.Vector3(1, 0, 0); 
vector.applyQuaternion(quaternion);
var twist = function(geometry) {
  const quaternion = new THREE.Quaternion();
  for (let i = 0; i < geometry.vertices.length; i++) {
	// a single vertex Y position
	const yPos = geometry.vertices[i].y;
	const twistAmount = 10;
	const upVec = new THREE.Vector3(0, 1, 0);
	quaternion.setFromAxisAngle(upVec, (Math.PI / 180) * (yPos / twistAmount));
	geometry.vertices[i].applyQuaternion(quaternion);
  }
  // tells Three.js to re-render this mesh
  geometry.verticesNeedUpdate = true;
}
console.log(geometry)

/////////////////////////////////////////// RENDER LOOP ///////////////////////////////////////////
var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  twist(geometry)
  renderer.render(scene, camera);
};

render();