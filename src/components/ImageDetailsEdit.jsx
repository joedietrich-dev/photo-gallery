import { useState } from "react";
import { useHistory } from "react-router-dom";

function ImageDetailsEdit({ image, handleEditImage = (f) => f }) {
  const [photoDetails, setPhotoDetails] = useState({ description: image.description });
  const history = useHistory();

  const handleFieldChange = (e) => {
    setPhotoDetails({
      ...photoDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images/${image.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(photoDetails),
    })
      .then((res) => res.json())
      .then((editedImage) => handleEditImage(editedImage))
      .then(history.push(`/image/${image.id}`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">Description:</label>
      <input id="description" type="text" value={photoDetails.description} onChange={handleFieldChange} />
      <input type="submit" />
    </form>
  );
}

export default ImageDetailsEdit;
