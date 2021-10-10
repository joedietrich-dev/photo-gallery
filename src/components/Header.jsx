import { Link, NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const activeStyle = {
  fontWeight: "bold",
  color: "green",
  textDecoration: "none",
};

function Header() {
  return (
    <StyledHeader>
      <h1>
        <Link to="/"> React Photo Gallery</Link>
      </h1>
      <NavLink to="/new" activeStyle={activeStyle} exact>
        New Photo
      </NavLink>
      <p>&nbsp;||&nbsp;</p>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Gallery
      </NavLink>
      <p>&nbsp;||&nbsp;</p>
      <NavLink to="/favorites" activeStyle={activeStyle} exact>
        Favorites
      </NavLink>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  grid-area: header;
  height: auto;
  padding: 1rem;
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  background: white;
  margin-bottom: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

  & a {
    text-decoration: none;
  }

  & a:hover {
    color: hsl(0.3turn 25% 55% / 1);
  }

  & h1 {
    margin: 0 2rem 0 0;
  }

  & h1 a {
    color: black;
  }
`;
