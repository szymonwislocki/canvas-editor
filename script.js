const uploadedFile = document.getElementById("photo-input");
const deleteButton = document.getElementById("delete");
let currentShape;
let transformer = new Konva.Transformer();
let stage = new Konva.Stage({
  container: "container", // ID elementu canvas
  width: 600,
  height: 800,
});

uploadedFile.addEventListener("change", function (e) {
  const URL = window.URL;
  const url = URL.createObjectURL(e.target.files[0]);
  const img = new Image();
  img.src = url;

  img.onload = function () {
    // let imgWidth = img.width;
    // let imgHeight = img.height;

    let theImg = new Image();
    theImg.src = url;

    const konvaImg = new Konva.Image({
      image: theImg,
      width: theImg.width,
      height: theImg.height,
      draggable: true,
      resizeEnabled: true,
      id: String(url),
    });

    //every Img has its own Layer - NF
    const layer = new Konva.Layer();
    layer.add(transformer);
    layer.add(konvaImg);
    stage.add(layer);
    layer.draw();

    uploadedFile.value = null;
    currentShape = konvaImg;
    transformer.nodes([currentShape]);
  };
});

deleteButton.addEventListener("click", () => {
  if (currentShape !== stage) currentShape.parent.getChildren((node) => node.getClassName() !== "Transformer").forEach((el) => el.remove());
  transformer.nodes([]);
});

stage.on("tap click dragstart", (e) => {
  currentShape = e.target;
  if (currentShape === stage) {
    transformer.nodes([]);
  } else {
    transformer.nodes([currentShape]);
  }
  stage.draw();
});
