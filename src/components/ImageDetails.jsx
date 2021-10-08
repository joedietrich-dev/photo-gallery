import { useEffect, useState } from "react";
import { Switch, Route, useParams, useHistory, useRouteMatch, Link } from "react-router-dom";
import ImageDetailsEdit from "./ImageDetailsEdit";

function ImageDetails({ images = [], handleDeleteImage = (f) => f, handleEditImage = (f) => f }) {
  const [image, setImage] = useState(null);
  const { path, url } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setImage(images.find((image) => image.id === parseInt(id, 10)));
  }, [images, id]);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images/${image.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          history.push("/");
          handleDeleteImage(image);
        } else {
          throw new Error("Could not delete the requested resource");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleFavorite = () => {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images/${image.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ favorite: !image.favorite }),
    })
      .then((res) => res.json())
      .then((favoritedImage) => handleEditImage(favoritedImage));
  };

  const showDetails = () => {
    if (!image) {
      if (images.length > 0) return <p>Image not found</p>;
      return <p>Loading...</p>;
    } else {
      return (
        <>
          <img src={image.imageUrl} alt={image.description} height="300" />
          <Switch>
            <Route exact path={path}>
              <div>
                <p>{image.description}</p>
                <Link to={`${url}/edit`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleFavorite}>{image.favorite ? "❤️" : "🤍"}</button>
              </div>
            </Route>
            <Route path={`${path}/edit`}>
              <ImageDetailsEdit image={image} handleEditImage={handleEditImage} />
            </Route>
          </Switch>
        </>
      );
    }
  };

  return <div>{showDetails()}</div>;
}

export default ImageDetails;
