import styled from "styled-components";

const Layout = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Layout;

const StyledContainer = styled.div`
  min-width: 320px;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
