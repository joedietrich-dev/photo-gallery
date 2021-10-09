import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function Gallery({ images }) {
  return (
    <GalleryContainer>
      {images.map((image) => (
        <GalleryImageTile key={image.id}>
          <Link to={`/image/${image.id}`}>
            <GalleryImage src={image.imageUrl} alt={image.description} />
            <GalleryLikeOverlay>{image.favorite ? "❤️" : "🤍"}</GalleryLikeOverlay>
            <GalleryOverlay>
              <GalleryOverlayText>{image.description}</GalleryOverlayText>
            </GalleryOverlay>
          </Link>
        </GalleryImageTile>
      ))}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: calc(100% - 2rem);
  max-width: 1600px;
  margin: 0 auto 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
  gap: 1rem;
`;

const GalleryOverlayText = styled.p`
  color: white;
  margin: 0;
  padding: 1rem;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  opacity: 0%;
  transition: 0.5s;
`;

const GalleryLikeOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 1rem;
  background: rgba(0, 0, 0, 0.75);
  opacity: 0%;
  transition: 0.5s;
  font-size: 1.25rem;
`;

const GalleryImage = styled.img`
  position: relative;
  top: -0.25rem;
  left: -0.25rem;
  width: calc(100% + 0.5rem);
  height: calc(100% + 0.5rem);
  transition: 0.5s;
  object-fit: cover;
`;

const GalleryImageTile = styled.div`
  aspect-ratio: 1/1;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;

  &:hover ${GalleryOverlay}, &:hover ${GalleryLikeOverlay} {
    opacity: 100%;
  }

  &:hover ${GalleryImage} {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Gallery;
