import React, { useState } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import particlesOptions from "./particlesjs-config.json";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const FaceApp = new Clarifai.App({
  apiKey: "051ff981dbdc4ffeb04e0926719704ab"
});

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);

  const onInputChange = event => setInput(event.target.value);

  const onSubmitHandler = () => {
    setImageUrl(input);
    setBoxes([]);
    FaceApp.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => displayFaceBox(response))
      .catch(err => alert(err));
  };

  const displayFaceBox = data => {
    let results = data.outputs[0].data.regions.map(region => {
      const box = region.region_info.bounding_box;
      return {
        top: `${Number(box.top_row) * 100}%`,
        left: `${Number(box.left_col) * 100}%`,
        bottom: `${(1 - Number(box.bottom_row)) * 100}%`,
        right: `${(1 - Number(box.right_col)) * 100}%`
      };
    });
    setBoxes(results);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onSubmitHandler={onSubmitHandler}
        onInputChange={onInputChange}
      />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
    </div>
  );
}

export default App;
