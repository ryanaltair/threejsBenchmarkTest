var camera, scene, renderer, mesh, material, spriteMaterial;
var drawStartPos = new THREE.Vector2();
init();
addDraw()
animate();

function init() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    var controls = new THREE.OrbitControls(camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(100, 1, 1);
    scene.add(light);
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-100, -1, -1);
    scene.add(light);
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

function addCube() {
    material = new THREE.MeshBasicMaterial();
    mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(60, 60, 200), material);
    var canvas = document.getElementById('drawing-canvas');
    scene.add(mesh)
    var ctx = canvas.getContext('2d');
    ctx.fillRect(0, 0, 128, 128);
    material.map = new THREE.CanvasTexture(canvas);
    material.map.needsUpdate = true;
    var ctx = canvas.getContext('2d');
    let text = "test"
    let textColor = '#000000',
        backgroundColor = '#ffffff',
        ringColor = '#000000',
        fontSize = 32
    let lineWidth = 5,
        fontStyle = 'normal',
        fontFace = 'sans-serif'
    const font = `${fontStyle} ${fontSize}px ${fontFace}`;
    ctx.font = font;
    const textWidth = ctx.measureText(text).width;
    canvas.width = canvas.height = textWidth * 2.8;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = textWidth;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.textBaseline = "middle";
    ctx.fillText(text, centerX, centerY);
}

function addDraw() {
    // var canvas = document.getElementById('drawing-canvas');
    // var spriteMap = new THREE.TextureLoader().load("sprite.png");
    // var spriteMaterial = new THREE.SpriteMaterial({
    //     map: spriteMap,
    //     color: 0xffffff
    // });
    // var sprite = new THREE.Sprite(spriteMaterial);
    // sprite.position.set(120, 12, 0)
    // scene.add(sprite);


    var textureLoader = new THREE.TextureLoader();
    var mapB = textureLoader.load("sprite.png");
    var materialB = new THREE.SpriteMaterial({
        map: mapB,
        color: 0xffffff,
        fog: true
    });


    var sprite = new THREE.Sprite(materialB);
    scene.add(sprite);

    renderer.autoClear = false; // To allow render overlay on top of sprited sphere

}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}