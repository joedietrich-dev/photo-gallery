import { useState } from "react";

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
    console.log(e);
    fetch("http://localhost:3001/images", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPhoto),
    })
      .then((res) => res.json())
      .then((newImage) => handleAddImage(newImage));
    e.preventDefault();
    setNewPhoto(INITIAL_PHOTO);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">Image Url:</label>
        <input id="imageUrl" type="url" value={newPhoto.imageUrl} onChange={handleFieldChange} />
        <label htmlFor="description">Description:</label>
        <input id="description" type="text" value={newPhoto.description} onChange={handleFieldChange} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewPhoto;
