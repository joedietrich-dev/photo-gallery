import styled from "styled-components/macro";

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 2rem;

  label {
    margin-bottom: 0.25rem;
  }
  input {
    font-family: inherit;
  }
  input:not([type="submit"]),
  textarea {
    margin-bottom: 0.75rem;
  }

  textarea {
    resize: none;
    font-family: inherit;
  }

  input[type="submit"] {
    padding: 0.25rem;
  }
`;

export default StyledForm;
