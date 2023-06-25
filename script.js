const uploadedFile = document.getElementById("photo-input");

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
    });

    //transformer do resize i
    const transformer = new Konva.Transformer({
      node: konvaImg,
      enabledAnchors: [
        "top-left",
        "top",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ],
      enabledControls: ["rotation", "scaling"],
    });

    layer.add(konvaImg);
    layer.add(transformer);
    stage.draw();
    uploadedFile.value = null;
  };
});
