import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ImageDetails({ images = [] }) {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage(images.find((image) => image.id === parseInt(id, 10)));
  }, [images, id]);
  return (
    <div>
      {image ? (
        <>
          <img src={image.imageUrl} alt={image.description} height="300" />
          <p>{image.description}</p>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default ImageDetails;
