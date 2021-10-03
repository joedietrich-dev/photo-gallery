import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import ImageDetails from "./components/ImageDetails";
import Main from "./components/Main";
import NewPhoto from "./components/NewPhoto";

function App() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/images")
      .then((res) => res.json())
      .then(setImages);
  }, []);
  return (
    <Router>
      <div className="App">
        <Header>
          <NavLink to="/new">New Photo</NavLink>
          &nbsp;||&nbsp;
          <NavLink to="/">Gallery</NavLink>
        </Header>
        <Main>
          <Switch>
            <Route path="/new">
              <NewPhoto />
            </Route>
            <Route path="/image/:id">
              <ImageDetails images={images} />
            </Route>
            <Route path="/">
              <Gallery images={images} />
            </Route>
          </Switch>
        </Main>
      </div>
    </Router>
  );
}

export default App;
