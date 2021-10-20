import { useState } from "react";
import StyledForm from "./StyledForm";

const INITIAL_PHOTO = {
  description: "",
  imageUrl: "",
  favorite: false,
};

function NewImage({ handleAddImage }) {
  const [newImage, setNewImage] = useState(INITIAL_PHOTO);

  const handleFieldChange = (e) => {
    setNewImage({
      ...newImage,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newImage),
    })
      .then((res) => res.json())
      .then((newImage) => handleAddImage(newImage))
      .catch(console.log);
    setNewImage(INITIAL_PHOTO);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="imageUrl">Image Url:</label>
      <input id="imageUrl" type="url" value={newImage.imageUrl} onChange={handleFieldChange} required />
      <label htmlFor="description">Description:</label>
      <textarea id="description" type="text" rows="3" value={newImage.description} onChange={handleFieldChange} />
      <input type="submit" />
    </StyledForm>
  );
}

export default NewImage;
