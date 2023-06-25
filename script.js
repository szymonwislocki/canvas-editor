//import { v4 as uuidv4 } from "uuid";
const uploadedFile = document.getElementById("photo-input");
const deleteButton = document.getElementById("delete");

let stage = new Konva.Stage({
  container: "container", // ID elementu canvas
  width: 600,
  height: 800,
});

let layer = new Konva.Layer();
stage.add(layer);
layer.draw();

uploadedFile.addEventListener("change", function (e) {
  const URL = window.URL;
  const url = URL.createObjectURL(e.target.files[0]);
  const img = new Image();
  img.src = url;
  //const imgId = uuidv4();

  img.onload = function () {
    let imgWidth = img.width;
    let imgHeight = img.height;

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

    //transformer do resize i
    const transformer = new Konva.Transformer();
    layer.add(transformer);
    transformer.nodes([konvaImg]);

    layer.add(konvaImg);
    stage.draw();
    console.log(konvaImg.attrs.id);

    uploadedFile.value = null;
  };
});
