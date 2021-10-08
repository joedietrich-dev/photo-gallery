import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import ImageDetails from "./components/ImageDetails";
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
        <Header>
          <NavLink to="/new">New Photo</NavLink>
          &nbsp;||&nbsp;
          <NavLink to="/">Gallery</NavLink>
          &nbsp;||&nbsp;
          <NavLink to="/favorites">Favorites</NavLink>
        </Header>
        <Main>
          <Switch>
            <Route path="/new">
              <NewPhoto handleAddImage={handleAddImage} />
            </Route>
            <Route path="/image/:id">
              <ImageDetails images={images} handleDeleteImage={handleDeleteImage} handleEditImage={handleEditImage} />
            </Route>
            <Route path="/favorites">
              <Gallery images={images.filter((image) => image.favorite)} />
            </Route>
            <Route path="/">
              <Gallery images={images} />
            </Route>
          </Switch>
          <AddImageActionArea handleAddImage={handleAddImage} />
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
