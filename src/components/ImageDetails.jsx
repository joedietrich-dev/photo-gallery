import { useEffect, useState } from "react";
import { Switch, Route, useParams, useHistory, useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components/macro";
import ImageDetailsEdit from "./ImageDetailsEdit";
import LikeButton, { LikeOverlay } from "./LikeButton";

function ImageDetails({ images = [], handleDeleteImage = (f) => f, handleEditImage = (f) => f }) {
  const [image, setImage] = useState(null);
  const { path, url } = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setImage(images.find((image) => image.id === parseInt(id, 10)));
  }, [images, id]);

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/images/${image.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          history.push("/");
          handleDeleteImage(image);
        } else {
          throw new Error("Could not delete the requested resource");
        }
      })
      .catch((err) => console.log(err));
  };

  const showDetails = () => {
    if (!image) {
      if (images.length > 0) return <p>Image not found</p>;
      return <p>Loading...</p>;
    } else {
      return (
        <>
          <NavButton area={"p"}>&lt;</NavButton>
          <DetailCardImageHolder>
            <LikeButton image={image} handleEditImage={handleEditImage} />
          </DetailCardImageHolder>
          <DetailCardImage src={image.imageUrl} alt={image.description} width="300" />
          <NavButton area={"n"}>&gt;</NavButton>
          <Switch>
            <Route exact path={path}>
              <DetailCardDescription>
                <p>{image.description}</p>
                <Link to={`${url}/edit`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
              </DetailCardDescription>
            </Route>
            <Route path={`${path}/edit`}>
              <ImageDetailsEdit image={image} handleEditImage={handleEditImage} />
            </Route>
          </Switch>
        </>
      );
    }
  };

  return <DetailCard>{showDetails()}</DetailCard>;
}

export default ImageDetails;

const DetailCard = styled.div`
  display: grid;
  grid: "p i n" ". d ." / min-content 1fr min-content;
`;

const DetailCardDescription = styled.div`
  grid-area: d;
`;

const DetailCardImage = styled.img`
  grid-area: i;
  width: 100%;
`;

const DetailCardImageHolder = styled.div`
  grid-area: i;
  width: 100%;
  position: relative;

  &:hover ${LikeOverlay} {
    opacity: 100%;
  }
`;

const NavButton = styled.button`
  grid-area: ${(props) => props.area};
  padding: 0 2rem;
  margin: 0;
  background: none;
  border: 0;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    background: white;
  }
`;
