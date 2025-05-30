const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let scene,
  shoeMesh,
  selectedTexture = "set1";

const createScene = async () => {
  scene = new BABYLON.Scene(engine);

  // Environment
  scene.environmentTexture = new BABYLON.HDRCubeTexture(
    "background.hdr",
    scene,
    160,
    false,
    true,
    false,
    true
  );

  scene.createDefaultSkybox(scene.environmentTexture, true, 1000);

  // Camera
  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / -3.5,
    Math.PI / 2.5,
    20,
    new BABYLON.Vector3(0, 0.5, 0),
    scene
  );
  camera.attachControl(canvas, true);

  // Light
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 1.0;

  // Load Model
  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./model/",
    "scarpa.glb",
    scene
  );
  shoeMesh = result.meshes.find((m) => m.material);
  shoeMesh.scaling = new BABYLON.Vector3(6, 6, 6);

  // Load default texture
  setTexture("set1");

  return scene;
};

// Set texture
function setTexture(setName) {
  selectedTexture = setName;

  const path = `./textures/${setName}/shoe/`;

  const mat = new BABYLON.StandardMaterial("shoeMat", scene);
  mat.diffuseTexture = new BABYLON.Texture(path + "basecolor.png", scene);
  mat.bumpTexture = new BABYLON.Texture(path + "normal.png", scene);

  mat.diffuseTexture.vScale = -1;
  mat.bumpTexture.vScale = -1;

  shoeMesh.material = mat;
}

// Add to cart
function addToCart() {
  const item = {
    name: "Nike Sneakers",
    texture: selectedTexture,
    price: 129.99,
  };

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  cart.push(item);

  localStorage.setItem("cartItems", JSON.stringify(cart));

  document.getElementById(
    "modal-message"
  ).innerText = `Added to cart: ${item.name} - ${item.texture}`;
  document.getElementById("modal").style.display = "block";
}

// Close modal click icon
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Close modal click outise
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

createScene().then(() => {
  engine.runRenderLoop(() => scene.render());
});

window.addEventListener("resize", () => engine.resize());
