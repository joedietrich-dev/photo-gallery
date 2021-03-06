import { useState } from "react";
import styled from "styled-components/macro";
import { ActionButton, ActionButtonText } from "./ActionButton";
import NewImage from "./NewImage";
import StyledForm from "./StyledForm";

function AddImageActionArea({ handleAddImage }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen ? (
        <ModalPopup>
          <h2>New Image</h2>
          <NewImage handleAddImage={handleAddImage} />
        </ModalPopup>
      ) : null}
      <ActionButton onClick={() => setIsOpen((val) => !val)}>
        <ActionButtonText isDialogOpen={isOpen}>+</ActionButtonText>
      </ActionButton>
    </div>
  );
}

const ModalPopup = styled.div`
  position: fixed;
  bottom: 8rem;
  right: 3rem;
  width: 300px;
  padding: 1rem;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  & h2 {
    margin-top: 0;
  }

  & ${StyledForm} {
    padding: 0;
  }
`;

export default AddImageActionArea;
