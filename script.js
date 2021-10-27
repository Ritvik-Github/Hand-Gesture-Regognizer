var model = "https://teachablemachine.withgoogle.com/models/8Pe5xH2JG/model.json";

function changemodel() {
    var n = document.getElementById("modelInput").value;
    model = n;
    console.log(model);
}

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});

var camera = document.getElementById("camera");

Webcam.attach("#camera", camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ml5 version: ", ml5.version);

var classifier = ml5.imageClassifier(model,modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}