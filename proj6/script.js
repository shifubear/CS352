if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var container;
var camera, scene, renderer, raycaster;
var mesh, mouse = new THREE.Vector2();
init();
animate();
function init() {

    var petalcount = 8;

    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 500;
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x222222 );
    scene.fog = new THREE.Fog( 0x000000, 1, 15000 );
    var light = new THREE.PointLight( 0xffffff );
    light.position.z = 500;
    camera.add( light );
    scene.add( camera );
    var light = new THREE.AmbientLight( 0x111111 );
    scene.add( light );

    // Define stem
    var stem = new THREE.BoxGeometry( 15, 100, 15 );
    var material = new THREE.MeshLambertMaterial( { color: 0xff0000, morphTargets: true } );
    // construct 8 blend shapes
    for ( var i = 0; i < 8; i ++ ) {
        var vertices = [];
        for ( var v = 0; v < stem.vertices.length; v ++ ) {
            vertices.push( stem.vertices[ v ].clone() );
            if ( v === i ) {
                vertices[ vertices.length - 1 ].x *= 2;
                vertices[ vertices.length - 1 ].y *= 2;
                vertices[ vertices.length - 1 ].z *= 2;
            }
        }
        stem.morphTargets.push( { name: "target" + i, vertices: vertices } );
    }
    stem = new THREE.BufferGeometry().fromGeometry( stem );
    mesh = new THREE.Mesh( stem, material );
    scene.add( mesh );
    //

    for ( var i = 1; i <= petalcount; i++ ) {
        var petal = new THREE.BoxGeometry( 40, 6, 6 );
        var pmaterial = new THREE.MeshLambertMaterial( { color: 0xff0000, morphTargets: true } );
        petal = new THREE.BufferGeometry().fromGeometry( petal );
        petalmesh = new THREE.Mesh( petal, material );
        petalmesh.rotation.y = THREE.Math.degToRad( (i-1) * 360 / petalcount );    
        petalmesh.position.set( 25 * Math.cos( i * (2 * Math.PI / petalcount) ), 50, 25 * Math.sin( i * (2 * Math.PI / petalcount) ));
        console.log("x pos ", Math.cos( i * (2 * Math.PI / petalcount) ))
        scene.add( petalmesh );
    }

    var params = {
        influence1: 0,
        influence2: 0,
        influence3: 0,
        influence4: 0,
        influence5: 0,
        influence6: 0,
        influence7: 0,
        influence8: 0
    };
    var gui = new dat.GUI();
    var folder = gui.addFolder( 'Morph Targets' );
    folder.add( params, 'influence1', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 0 ] = value;
    } );
    folder.add( params, 'influence2', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 1 ] = value;
    } );
    folder.add( params, 'influence3', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 2 ] = value;
    } );
    folder.add( params, 'influence4', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 3 ] = value;
    } );
    folder.add( params, 'influence5', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 4 ] = value;
    } );
    folder.add( params, 'influence6', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 5 ] = value;
    } );
    folder.add( params, 'influence7', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 6 ] = value;
    } );
    folder.add( params, 'influence8', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
        mesh.morphTargetInfluences[ 7 ] = value;
    } );
    folder.open();
    //
    raycaster = new THREE.Raycaster();
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 400;
    controls.maxDistance = 1000;
    //
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'click', onClick, false );
}
function onClick( event ) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObject( mesh );
    if ( intersects.length > 0 ) {
        mesh.material.color.set( Math.random() * 0xffffff );
    }
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    mesh.rotation.y += 0.01;
    renderer.render( scene, camera );
}
