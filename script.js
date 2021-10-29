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

var one_text = document.getElementById("one_text");
var two_text = document.getElementById("two_text");

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

function speak() {
    var synth = window.SpeechSynthesis;
    var speak_data_1 = "the first prediction is " + preditction_1; 
    var speak_data_2 = "and the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    console.log("gotResults()");
    if (error){
    console.log(error);
    } else {
        console.log(results);
        one_text.innerHTML = results[0].label;
        two_text.innerHTML = results[1].label;
        var prediction_1 = results[0].label;
        var prediction_2 = results[1].label;
        speak();
        console.log(prediction_1);
        console.log(prediction_2);
    }
}