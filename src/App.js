import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import ImageDetails from "./components/ImageDetails";
import Main from "./components/Main";
import NewPhoto from "./components/NewPhoto";
import styled from "styled-components/macro";
import ActionButton from "./components/ActionButton";

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((res) => res.json())
      .then(setImages);
  }, []);

  const handleAddImage = (image) => {
    setImages([...images, image]);
  };
  return (
    <Router>
      <AppContainer>
        <Header>
          <NavLink to="/new">New Photo</NavLink>
          &nbsp;||&nbsp;
          <NavLink to="/">Gallery</NavLink>
        </Header>
        <Main>
          <Switch>
            <Route path="/new">
              <NewPhoto handleAddImage={handleAddImage} />
            </Route>
            <Route path="/image/:id">
              <ImageDetails images={images} />
            </Route>
            <Route path="/">
              <Gallery images={images} />
            </Route>
          </Switch>
          <Link to="/new">
            <ActionButton>+</ActionButton>
          </Link>
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
