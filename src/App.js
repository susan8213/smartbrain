import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import particlesOptions from "./particlesjs-config.json";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Api from "./helper/api";

function App() {
  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);

  const signinHandler = data => {
    setUser(data);
  };
  const signout = () => {
    setUser();
    setInput("");
    setImageUrl("");
    setBoxes([]);
  };

  const onInputChange = event => setInput(event.target.value);

  const onSubmitHandler = () => {
    setImageUrl(input);
    setBoxes([]);
    new Api()
      .detectFaces(input)
      .then(response => {
        const data = response.data;
        if (data) {
          new Api().increaseEntry(user).then(response => {
            setUser({ ...user, entries: response.data });
          });
          displayFaceBox(data);
        }
      })
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
      <Router>
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={user ? true : false} signoutHandler={signout} />
        <Logo />
        <Route exact path="/">
          {user ? (
            <>
              <Rank user={user} />
              <ImageLinkForm
                onSubmitHandler={onSubmitHandler}
                onInputChange={onInputChange}
              />
              <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login">
          {!user ? (
            <Signin signinHandler={signinHandler} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/register">
          {!user ? (
            <Register registerHandler={signinHandler} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Router>
    </div>
  );
}

export default App;
