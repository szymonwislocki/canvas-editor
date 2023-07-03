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
    let imgWidth = img.width;
    let imgHeight = img.height;

    let theImg = new Image();
    theImg.src = url;

    const konvaImg = new Konva.Image({
      image: theImg,
      width: theImg.width - (theImg.width * 1, 1),
      height: theImg.height,
      draggable: true,
      resizeEnabled: true,
      id: String(url),
    });

    //every Img has its own Layer
    const layer = new Konva.Layer();
    layer.add(transformer);
    stage.add(layer);
    layer.add(konvaImg);
    layer.draw();

    uploadedFile.value = null;
    //remove all transforms from every image on stage (by forEach)???
    transformer.nodes([konvaImg]);
    // konvaImg.on("click", (e) => {
    //   console.log(e)
    //   e.parent.draw();
    // });
  };
});

deleteButton.addEventListener("click", () => {
  console.log(currentShape);
  if (currentShape !== stage) currentShape.parent.remove();
  console.log(transformer);
});

stage.on("click dragstart", (e) => {
  currentShape = e.target;
  if (currentShape === stage) {
    transformer.nodes([]);
  } else {
    transformer.nodes([currentShape]);
  }
});
