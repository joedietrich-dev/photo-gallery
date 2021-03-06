import styled from "styled-components/macro";

export const ActionButtonText = styled.span`
  display: inline-block;
  transform: ${(props) => (props.isDialogOpen ? "rotate(45deg)" : "rotate(0deg)")};
  transition: 0.2s;
`;

export const ActionButton = styled.button`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: hsl(0.3turn 25% 75% / 1);
  padding: 0;
  font-size: 2rem;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  cursor: pointer;
  font-family: inherit;
  transition: 0.2s;

  :hover {
    background: hsl(0.3turn 25% 55% / 1);
  }
  :active {
    background: hsl(0.3turn 25% 85% / 1);
  }
`;

export default ActionButton;
