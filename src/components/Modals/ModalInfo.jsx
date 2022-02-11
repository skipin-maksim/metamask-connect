import { metaMaskLink } from "../../common/metaMaskData";
import Modal from "./Modal";
import styled from "styled-components";

const ModalInfo = props => {
  return (
    <Modal {...props} header="Information">
      <p>
        You do not have the MetaMask browser extension installed. Or you are not
        logged into your account.
      </p>

      <p>
        You can install it by clicking on the link{" "}
        <StyledLink href={metaMaskLink} target="_blank" rel="noopener">
          MetaMask
        </StyledLink>
        . After installation, reload the page and try again.
      </p>
    </Modal>
  );
};

export default ModalInfo;

const StyledLink = styled.a`
  font-weight: 600;
`;
