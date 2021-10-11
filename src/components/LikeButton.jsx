import styled from "styled-components/macro";

function LikeButton({ image = { favorite: false, url: null, id: 0 }, handleEditImage }) {
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
  return <LikeOverlay onClick={handleFavorite}>{image?.favorite ? "❤️" : "🤍"}</LikeOverlay>;
}

export default LikeButton;

export const LikeOverlay = styled.button`
  z-index: 1000;
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 1rem;
  border: 0;
  background: rgba(0, 0, 0, 0.75);
  opacity: 0%;
  transition: 0.5s;
  font-size: 1.25rem;
  cursor: pointer;
`;
