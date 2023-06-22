const stage = new Konva.Stage({
  container: "container", // ID elementu canvas
  width: 600,
  height: 800,
});

const layer = new Konva.Layer();
stage.add(layer);
stage.draw();

const uploadedFile = document.getElementById("photo-input");

const uploadedImage = new Image();
uploadedImage.onload = function () {
  const image = new Konva.Image({
    image: imageObj,
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  layer.add(image); //dodaj obraz do warstwy

  stage.add(layer); //dodaj warstwę do sceny
};

uploadedImage.src = "";
