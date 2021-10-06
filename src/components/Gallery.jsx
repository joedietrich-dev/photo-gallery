import { Link } from "react-router-dom";
import styled from "styled-components/macro";

function Gallery({ images }) {
  return (
    <GalleryContainer>
      {images.map((image) => (
        <GalleryImageTile key={image.id}>
          <Link to={`/image/${image.id}`}>
            <img src={image.imageUrl} alt={image.description} />
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
  width: 100%;
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

const GalleryImageTile = styled.div`
  flex: 0 1 20rem;
  max-width: 100%;
  height: 20rem;
  position: relative;
  border-radius: 10%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover ${GalleryOverlay} {
    opacity: 100%;
  }
`;

export default Gallery;
