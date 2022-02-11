import Layout from "../Layout/Layout";
import styled from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <Layout>
        <h1>MetaMask connection</h1>
      </Layout>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  padding: 20px 0;
  background: #1b1d23;
`;
