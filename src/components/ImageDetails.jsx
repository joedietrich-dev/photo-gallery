import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function ImageDetails({ images = [], handleDeleteImage = (f) => f }) {
  const { id } = useParams();
  const [image, setImage] = useState(null);
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

  const showDetails = () => {
    if (!image) {
      if (images.length > 0) return <p>Image not found</p>;
      return <p>Loading...</p>;
    } else {
      return (
        <>
          <img src={image.imageUrl} alt={image.description} height="300" />
          <p>{image.description}</p>
          <button>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      );
    }
  };

  return <div>{showDetails()}</div>;
}

export default ImageDetails;
