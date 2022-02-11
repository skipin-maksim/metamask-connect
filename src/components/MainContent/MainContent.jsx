import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../Layout/Layout";
import ModalInfo from "../Modals/ModalInfo";
import useMetaMask from "../../hooks/useMetaMask";
import useModal from "../../hooks/useModal";

const MainContent = () => {
  const [connectionInProgress, setConnectionInProgress] = useState(false);

  const { closeModal, openModal, isShow } = useModal();
  const { isMetaMaskInstalled, getWallet, wallet } = useMetaMask(true);

  const connectionHandle = async () => {
    setConnectionInProgress(true);

    if (!isMetaMaskInstalled()) {
      setConnectionInProgress(false);
      return openModal();
    }

    try {
      await getWallet();
    } catch (e) {
      console.log(e);
    } finally {
      setConnectionInProgress(false);
    }
  };

  return (
    <>
      <StyledMain>
        <Layout>
          {wallet ? (
            <StyledWalletWrp>
              <span>{wallet}</span>
              <StyledWalletOverlay />
            </StyledWalletWrp>
          ) : (
            <StyledConnectionBtn
              disabled={connectionInProgress}
              type="button"
              onClick={connectionHandle}
            >
              Get wallet number
            </StyledConnectionBtn>
          )}
        </Layout>
      </StyledMain>

      <ModalInfo isShow={isShow} closeModal={closeModal} />
    </>
  );
};

export default MainContent;

const StyledConnectionBtn = styled.button`
  padding: 15px;
  border: none;
  background: #2c4d97;
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.4);
    cursor: progress;
  }
`;

const StyledMain = styled.main`
  flex: 1 0 auto;
  padding: 20px 0;
`;

const StyledWalletWrp = styled.div`
  position: relative;
`;

const rotate = keyframes`
  from {
    top: 0;
  }

  to {
    top: 100%;
  }
`;

const StyledWalletOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #282c34;
  animation: ${rotate} 0.3s linear forwards;
`;
