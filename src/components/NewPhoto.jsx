import { useState } from "react";
import styled from "styled-components/macro";

const INITIAL_PHOTO = {
  description: "",
  imageUrl: "",
  likes: 0,
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
    <NewPhotoForm onSubmit={handleSubmit}>
      <label htmlFor="imageUrl">Image Url:</label>
      <input id="imageUrl" type="url" value={newPhoto.imageUrl} onChange={handleFieldChange} required />
      <label htmlFor="description">Description:</label>
      <textarea id="description" type="text" rows="3" value={newPhoto.description} onChange={handleFieldChange} />
      <input type="submit" />
    </NewPhotoForm>
  );
}

export const NewPhotoForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2rem;

  label {
    margin-bottom: 0.25rem;
  }
  input:not([type="submit"]),
  textarea {
    margin-bottom: 0.75rem;
  }

  textarea {
    resize: none;
  }

  input[type="submit"] {
    padding: 0.25rem;
  }
`;

export default NewPhoto;
