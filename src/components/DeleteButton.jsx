import { useHistory } from "react-router-dom";

function DeleteButton({ handleDeleteImage, image }) {
  const history = useHistory();

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
  return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteButton;
