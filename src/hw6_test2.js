
// Scene Declartion
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// This defines the initial distance of the camera, you may ignore this as the camera is expected to be dynamic
camera.applyMatrix4(new THREE.Matrix4().makeTranslation(-5, 3, 110));
camera.lookAt(0, -4, -1)


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// helper function for later on
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


// Here we load the cubemap and pitch images, you may change it

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'src/pitch/right.jpg',
  'src/pitch/left.jpg',
  'src/pitch/top.jpg',
  'src/pitch/bottom.jpg',
  'src/pitch/front.jpg',
  'src/pitch/back.jpg',
]);
scene.background = texture;


// TODO: Texture Loading
// We usually do the texture loading before we start everything else, as it might take processing time

const bMaterial = new THREE.MeshPhongMaterial({map: new  THREE.TextureLoader().load( 'src/textures/soccer_ball.jpg' )},{color: 0xffffff, emissive:0xffffff, specular: 0x111111} );
const redCardMaterial = new THREE.MeshPhongMaterial({map: new  THREE.TextureLoader().load( 'src/textures/red_card.jpg' )},{color: 0xffffff, emissive:0xffffff, specular: 0x111111} );
const yellowCardMaterial = new THREE.MeshPhongMaterial({map: new  THREE.TextureLoader().load( 'src/textures/yellow_card.jpg' )},{color: 0xffffff, emissive:0xffffff, specular: 0x111111} );


// TODO: Add Lighting

const directionalLight = new THREE.DirectionalLight( 0xffff0f, 1 );
scene.add( directionalLight );
const directionalLight2 = new THREE.DirectionalLight( 0x505050, 1 );
scene.add( directionalLight2 );
const ambientLight = new THREE.AmbientLight( 0xffeeee );
scene.add( ambientLight );

// TODO: Goal
// You should copy-paste the goal from the previous exercise here

const postsRadius = 0.1
const postGeometry = new THREE.CylinderGeometry( postsRadius, postsRadius, 1.6); 
const supportPostGeometry = new THREE.CylinderGeometry( postsRadius, postsRadius, 2.2627417); //sqrt(5.12)
const goalMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive:0xffffff, specular: 0x111111} ); 
const leftPost = new THREE.Mesh( postGeometry, goalMaterial );
const leftSupport = new THREE.Mesh( supportPostGeometry, goalMaterial );
const rightPost = new THREE.Mesh( postGeometry, goalMaterial );
const rightSupport = new THREE.Mesh( supportPostGeometry, goalMaterial );
const crossbarGeometry = new THREE.CylinderGeometry( postsRadius, postsRadius, 4.8); 
const crossbar = new THREE.Mesh( crossbarGeometry, goalMaterial );
const torusGeo = new THREE.TorusGeometry(0.1, 0.1, 10, 20);
const leftTorus = new THREE.Mesh(torusGeo, goalMaterial);
const rightTorus = new THREE.Mesh(torusGeo, goalMaterial);
const leftSupportTorus = new THREE.Mesh(torusGeo, goalMaterial);
const rightSupportTorus = new THREE.Mesh(torusGeo, goalMaterial);

//nets

const backNetGeometry = new THREE.PlaneGeometry( 1, 1 );
const netMaterial = new THREE.MeshPhongMaterial( {color: 0x999999, side: THREE.DoubleSide, transparent: true, opacity: 0.5} );
const x = 0, y = 0;
const sideNetShape = new THREE.Shape();
sideNetShape.lineTo( x + 1, y );
sideNetShape.lineTo( x , y + 1);
const sideNetGeometry = new THREE.ShapeGeometry( sideNetShape );
const backNet = new THREE.Mesh( backNetGeometry, netMaterial );
const leftNet = new THREE.Mesh( sideNetGeometry, netMaterial );
const rightNet = new THREE.Mesh( sideNetGeometry, netMaterial );

//positioning

trans = new THREE.Matrix4().makeRotationX(degrees_to_radians(90));
leftTorus.applyMatrix(trans);
leftSupportTorus.applyMatrix(trans);
rightTorus.applyMatrix(trans);
rightSupportTorus.applyMatrix(trans);

trans = new THREE.Matrix4().makeTranslation(-2.4, 0, 0);
leftPost.applyMatrix(trans);
leftSupport.applyMatrix(trans);
leftTorus.applyMatrix(trans);
leftSupportTorus.applyMatrix(trans);

trans = new THREE.Matrix4().makeRotationX(degrees_to_radians(45));
leftSupport.applyMatrix(trans);
rightSupport.applyMatrix(trans);
trans = new THREE.Matrix4().makeTranslation(0, 0, -0.8);
leftSupport.applyMatrix(trans);
rightSupport.applyMatrix(trans);

trans = new THREE.Matrix4().makeTranslation(2.4, 0, 0);
rightPost.applyMatrix(trans);
rightSupport.applyMatrix(trans);
rightTorus.applyMatrix(trans);
rightSupportTorus.applyMatrix(trans);

trans = new THREE.Matrix4().makeTranslation(0, 0, -1.6);
leftSupportTorus.applyMatrix(trans);
rightSupportTorus.applyMatrix(trans);

trans = new THREE.Matrix4().makeTranslation(0, -0.8, 0);
leftTorus.applyMatrix(trans);
leftSupportTorus.applyMatrix(trans);
rightTorus.applyMatrix(trans);
rightSupportTorus.applyMatrix(trans);

trans = new THREE.Matrix4().makeRotationZ(degrees_to_radians(90));
crossbar.applyMatrix(trans);
trans = new THREE.Matrix4().makeTranslation(0, 0.8, 0);
crossbar.applyMatrix(trans);

trans = new THREE.Matrix4().makeScale(4.8, 2.2627417, 1);
backNet.applyMatrix(trans);
trans = new THREE.Matrix4().makeRotationX(degrees_to_radians(45));
backNet.applyMatrix(trans);
trans = new THREE.Matrix4().makeTranslation(0, 0, -0.8);
backNet.applyMatrix(trans);

trans = new THREE.Matrix4().makeScale(1.6, 1.6, 1.6);
leftNet.applyMatrix(trans);
rightNet.applyMatrix(trans);
trans = new THREE.Matrix4().makeRotationY(degrees_to_radians(90));
leftNet.applyMatrix(trans);
rightNet.applyMatrix(trans);
trans = new THREE.Matrix4().makeTranslation(-2.4, 0, 0);
leftNet.applyMatrix(trans);
trans = new THREE.Matrix4().makeTranslation(0, -0.8, 0);
leftNet.applyMatrix(trans);
rightNet.applyMatrix(trans);
trans = new THREE.Matrix4().makeTranslation(2.4, 0, 0);
rightNet.applyMatrix(trans);

const goal = new THREE.Group();
goal.add( leftTorus );
goal.add( rightTorus );
goal.add( leftSupportTorus );
goal.add( rightSupportTorus );
goal.add( crossbar );
goal.add( leftPost );
goal.add( rightPost );
goal.add( leftSupport );
goal.add( rightSupport );
goal.add( backNet );
goal.add( leftNet );
goal.add( rightNet );

scene.add( goal );

var enlargeByFive = new THREE.Matrix4();
enlargeByFive.makeScale(5,5,5);
goal.applyMatrix(enlargeByFive);

// TODO: Ball
// You should add the ball with the soccer.jpg texture here

const sphereGeometry = new THREE.SphereGeometry(0.5);
const ballMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
const ball = new THREE.Mesh( sphereGeometry, bMaterial );
var trans = new THREE.Matrix4().makeTranslation(0, 0, 0);
ball.applyMatrix(trans);
scene.add( ball );

ball.position.set(0, 0, 100);

// TODO: Bezier Curves
const curve1 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( 0, 0, 100 ),
	new THREE.Vector3( 50, 0, 50),
	new THREE.Vector3( 0, 0, 0 )
);

const points1 = curve1.getPoints( 5000);
const geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );

const curve2 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( 0, 0, 100 ),
	new THREE.Vector3( 0, 50, 50 ),
	new THREE.Vector3( 0, 0, 0 )
);

const points2 = curve2.getPoints( 5000 );
const geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );

const curve3 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( 0, 0, 100 ),
	new THREE.Vector3( -50, 0, 50 ),
	new THREE.Vector3( 0, 0, 0 )
);

const points3 = curve3.getPoints( 5000 );
const geometry3 = new THREE.BufferGeometry().setFromPoints( points3);


// TODO: Add collectible cards with textures

const cardGeo = new THREE.PlaneGeometry( 2, 2 );
const redCard1 = new THREE.Mesh( cardGeo, redCardMaterial );
const redCard2 = new THREE.Mesh( cardGeo, redCardMaterial );
const redCard3 = new THREE.Mesh( cardGeo, redCardMaterial );
const yellowCard1 = new THREE.Mesh( cardGeo, yellowCardMaterial );
const yellowCard2 = new THREE.Mesh( cardGeo, yellowCardMaterial );
const yellowCard3 = new THREE.Mesh( cardGeo, yellowCardMaterial );

redCard1.position.set(points1[400].x,points1[400].y,points1[400].z);
redCard2.position.set(points2[1500].x,points2[1500].y,points2[1500].z);
redCard3.position.set(points3[4000].x,points3[4000].y,points3[4000].z);
yellowCard1.position.set(points1[600].x,points1[600].y,points1[600].z);
yellowCard2.position.set(points2[2000].x,points2[2000].y,points2[2000].z);
yellowCard3.position.set(points3[3000].x,points3[3000].y,points3[3000].z);

const redCards = [redCard1, redCard2, redCard3];
const yellowCards = [yellowCard1, yellowCard2, yellowCard3];

scene.add(redCard1); 
scene.add(redCard2); 
scene.add(redCard3); 
scene.add(yellowCard1); 
scene.add(yellowCard2); 
scene.add(yellowCard3);

var score = 0;
function computeScore(numYellowCards, numRedCards){
	score = 100 * Math.pow(2, ((numYellowCards + 10 *numRedCards)/-10));
	return score;
}

var yellowColissions = 0;
var redCollisions = 0;
function checkRedCollision(position){
	for (let card in redCards){
		if (position.x == redCards[card].position.x && position.y == redCards[card].position.y && position.z == redCards[card].position.z){
			redCollisions++;
			redCards[card].visible = false;
		}
	}
	return redCollisions;
}

function checkYellowCollision(position){
	for (let card in yellowCards){
		if (position.x == yellowCards[card].position.x && position.y == yellowCards[card].position.y && position.z == yellowCards[card].position.z){
			yellowColissions++;
			yellowCards[card].visible = false;
		}
	}
	return yellowColissions;
}

// TODO: Camera Settings
// Set the camera following the ball here

camera.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 20, 30));
camera.lookAt(goal.position);

// TODO: Add keyboard event
// We wrote some of the function for you

var isStarted = false;
var curve = 100;
var curveToFollow = 0;
var handle_keydown = (e) => {
	if(e.code == 'ArrowLeft'){
		curve++;
		isStarted = true;
	} else if (e.code == 'ArrowRight'){
		curve--;
		isStarted = true;
	}
	curveToFollow = Math.abs(curve % 3);
}
document.addEventListener('keydown', handle_keydown);

var numRedCards = 0;
var numYellowCards = 0;
var i = 0;
var zPosition = 0;
var degrees = 0;

function animate() {

	requestAnimationFrame( animate );

	if (isStarted){
		if(curveToFollow == 0){
			ball.position.x = points1[i].x;
			ball.position.y = points1[i].y;
			ball.position.z = points1[i].z;
		}
		if(curveToFollow == 1){
			ball.position.x = points2[i].x;
			ball.position.y = points2[i].y;
			ball.position.z = points2[i].z;
		}
		if(curveToFollow == 2){
			ball.position.x = points3[i].x;
			ball.position.y = points3[i].y;
			ball.position.z = points3[i].z;
		}
		
		camera.position.z -= 0.06;
		i += 4;

		numRedCards = checkRedCollision(ball.position);
		numYellowCards = checkYellowCollision(ball.position);
		
		//Rotate the ball around its center
		
		var posX = ball.position.x;
		var posY = ball.position.y;
		var posZ = ball.position.z;
		ball.applyMatrix4(new THREE.Matrix4().makeRotationY(degrees_to_radians(8)));
		ball.position.set(posX, posY, posZ);
		
		if( i > 4999){
			var score = computeScore(numYellowCards, numRedCards);
			var text = "Your Fair Play score is: " + score;
			window.alert(text);
		}
	}	
	renderer.render( scene, camera );

}
animate()