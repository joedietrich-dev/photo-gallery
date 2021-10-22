import { useEffect, useState } from "react";
import { Route, useParams, useHistory, useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components/macro";
import DeleteButton from "./DeleteButton";
import ImageDetailsEdit from "./ImageDetailsEdit";
import LikeButton, { LikeOverlay } from "./LikeButton";

function ImageDetails({ images = [], handleDeleteImage = (f) => f, handleEditImage = (f) => f, source = "/images" }) {
  const [image, setImage] = useState(null);
  const { path, url } = useRouteMatch();
  const { album, id } = useParams();
  const history = useHistory();

  const nextImageIndex = images.findIndex((i) => i.id === image?.id) + 1;
  const prevImageIndex = images.findIndex((i) => i.id === image?.id) - 1;
  const doesNextExist = nextImageIndex < images.length;
  const doesPrevExist = prevImageIndex >= 0;

  useEffect(() => {
    setImage(images.find((image) => image.id === parseInt(id, 10)));
  }, [images, id]);

  const onNextClick = () => {
    if (doesNextExist) history.push(`/${album}/${images[nextImageIndex].id}`);
  };
  const onPrevClick = () => {
    if (doesPrevExist) history.push(`/${album}/${images[prevImageIndex].id}`);
  };

  const showDetails = () => {
    if (!image) {
      if (images.length > 0) return <p>Image not found</p>;
      return <p>Loading...</p>;
    } else {
      return (
        <>
          <NavButton area={"p"} onClick={onPrevClick} disabled={!doesPrevExist}>
            &lt;
          </NavButton>
          <DetailCardImageHolder>
            <LikeButton image={image} handleEditImage={handleEditImage} />
            <DetailCardImage src={image.imageUrl} alt={image.description} width="300" />
          </DetailCardImageHolder>
          <NavButton area={"n"} onClick={onNextClick} disabled={!doesNextExist}>
            &gt;
          </NavButton>
          <Route exact path={path}>
            <DetailCardDescription>
              <p>{image.description}</p>
              <DetailCardDescriptionActions>
                <Link to={`${url}/edit`}>Edit</Link>
                <DeleteButton handleDeleteImage={handleDeleteImage} image={image} />
              </DetailCardDescriptionActions>
            </DetailCardDescription>
          </Route>
          <Route path={`${path}/edit`}>
            <DetailCardDescription>
              <ImageDetailsEdit image={image} handleEditImage={handleEditImage} />
            </DetailCardDescription>
          </Route>
        </>
      );
    }
  };

  return <DetailCard>{showDetails()}</DetailCard>;
}

export default ImageDetails;

const DetailCard = styled.div`
  display: grid;
  grid: "p i n" auto ". d ." auto / min-content 1fr min-content;
  max-width: 800px;
  margin: 0 auto;
`;

const DetailCardDescription = styled.div`
  grid-area: d;
`;

const DetailCardDescriptionActions = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  button {
    padding: 0.25rem;
    border-radius: 0;
    border: 1px solid;
    font-family: inherit;
    :hover {
      background-color: #e2e2e2;
    }
  }
`;

const DetailCardImage = styled.img`
  grid-area: i;
  width: 100%;
`;

const DetailCardImageHolder = styled.div`
  grid-area: i;
  width: 100%;
  position: relative;

  :hover ${LikeOverlay} {
    opacity: 100%;
  }
`;

const NavButton = styled.button`
  grid-area: ${(props) => props.area};
  padding: 0 1rem;
  background: none;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;

  :hover {
    background: white;
  }
`;
