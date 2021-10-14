import { useState } from "react";
import StyledForm from "./StyledForm";

const INITIAL_PHOTO = {
  description: "",
  imageUrl: "",
  favorite: false,
};

function NewPhoto({ handleAddImage }) {
  const [newPhoto, setNewPhoto] = useState(INITIAL_PHOTO);

  const handleFieldChange = (e) => {
    setNewPhoto({
      ...newPhoto,
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
      body: JSON.stringify(newPhoto),
    })
      .then((res) => res.json())
      .then((newImage) => handleAddImage(newImage));
    setNewPhoto(INITIAL_PHOTO);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="imageUrl">Image Url:</label>
      <input id="imageUrl" type="url" value={newPhoto.imageUrl} onChange={handleFieldChange} required />
      <label htmlFor="description">Description:</label>
      <textarea id="description" type="text" rows="3" value={newPhoto.description} onChange={handleFieldChange} />
      <input type="submit" />
    </StyledForm>
  );
}

export default NewPhoto;
