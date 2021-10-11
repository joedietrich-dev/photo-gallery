import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Main from "./components/Main";
import NewPhoto from "./components/NewPhoto";
import styled from "styled-components/macro";
import AddImageActionArea from "./components/AddImageActionArea";

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images`)
      .then((res) => res.json())
      .then(setImages);
  }, []);

  const handleAddImage = (image) => {
    setImages([...images, image]);
  };
  const handleEditImage = (editedImage) => {
    setImages(images.map((image) => (image.id === editedImage.id ? editedImage : image)));
  };
  const handleDeleteImage = (deletedImage) => {
    setImages(images.filter((image) => image.id !== deletedImage.id));
  };
  return (
    <Router>
      <AppContainer>
        <Header />
        <Main>
          <Switch>
            <Route path="/new">
              <NewPhoto handleAddImage={handleAddImage} />
            </Route>
            <Route path="/images">
              <Gallery images={images} handleEditImage={handleEditImage} handleDeleteImage={handleDeleteImage} />
              <AddImageActionArea handleAddImage={handleAddImage} />
            </Route>
            <Route path="/favorites">
              <Gallery images={images.filter((image) => image.favorite)} handleEditImage={handleEditImage} handleDeleteImage={handleDeleteImage} />
              <AddImageActionArea handleAddImage={handleAddImage} />
            </Route>
            <Route path="/">
              <Redirect to="/images" />
            </Route>
          </Switch>
        </Main>
      </AppContainer>
    </Router>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  display: grid;
  grid:
    "header" auto
    "main" 1fr / 100%;
`;

export default App;
