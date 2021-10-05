import { useState } from "react";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import NewPhoto from "./NewPhoto";

function AddImageActionArea({ handleAddImage }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen ? (
        <ModalPopup>
          <h2>New Image</h2>
          <NewPhoto handleAddImage={handleAddImage} />
        </ModalPopup>
      ) : null}
      <ActionButton onClick={() => setIsOpen((val) => !val)}>{isOpen ? "×" : "+"}</ActionButton>
    </div>
  );
}

const ModalPopup = styled.div`
  position: absolute;
  bottom: 8rem;
  right: 3rem;
  width: 200px;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  & h2 {
    margin-top: 0;
  }
`;

export default AddImageActionArea;
