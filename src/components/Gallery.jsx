import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function Gallery({ images }) {
  return (
    <GalleryContainer>
      {images.map((image) => (
        <GalleryImageTile key={image.id}>
          <Link to={`/image/${image.id}`}>
            <GalleryImage src={image.imageUrl} alt={image.description} />
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
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  margin: 0 auto;
  justify-content: center;
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
  flex: 1 1 calc(33% - 2rem);
  min-width: 10rem;
  min-height: 10rem;
  aspect-ratio: 1/1;
  max-height: 20rem;
  max-width: 20rem;

  position: relative;
  border-radius: 2rem;
  overflow: hidden;

  &:hover ${GalleryOverlay} {
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
