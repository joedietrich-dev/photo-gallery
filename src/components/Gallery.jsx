import { Link } from "react-router-dom";

function Gallery({ images }) {
  return (
    <div>
      {images.map((image) => (
        <Link to={`/image/${image.id}`} key={image.id}>
          <img src={image.imageUrl} alt={image.description} height="100" />
        </Link>
      ))}
    </div>
  );
}

export default Gallery;
