import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Main from "./components/Main";
import NewImage from "./components/NewImage";
import styled from "styled-components/macro";
import AddImageActionArea from "./components/AddImageActionArea";

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images`)
      .then((res) => res.json())
      .then(setImages)
      .catch((err) => {
        setImages([]);
        console.log(err);
      });
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
              <NewImage handleAddImage={handleAddImage} />
            </Route>
            <Route path="/:album">
              <Gallery images={images} handleEditImage={handleEditImage} handleDeleteImage={handleDeleteImage} />
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
