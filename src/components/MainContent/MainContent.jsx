import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../Layout/Layout";
import ModalInfo from "../Modals/ModalInfo";
import useMetaMask from "../../hooks/useMetaMask";
import useModal from "../../hooks/useModal";
import ModalNoAcc from "../Modals/ModalNoAcc";

const MainContent = () => {
  const [connectionInProgress, setConnectionInProgress] = useState(false);

  const [isShowModalInfo, openModalModalInfo, closeModalModalInfo] = useModal();
  const [isShowModalNoAcc, openModalNoAcc, closeModalNoAcc] = useModal();
  const { connectWallet, checkIfWalletIsConnect, currentWallets } =
    useMetaMask(true);

  const connectionHandle = async () => {
    setConnectionInProgress(true);

    try {
      const isConnected = await checkIfWalletIsConnect(openModalNoAcc);

      if (!isConnected) {
        setConnectionInProgress(false);
        return openModalModalInfo();
      }

      const status = await connectWallet(closeModalNoAcc);
      if (status === "connection") return setConnectionInProgress(true);

      setConnectionInProgress(false);
    } catch (e) {
      console.error(e);
      setConnectionInProgress(false);
    }
  };

  return (
    <>
      <StyledMain>
        <Layout>
          {currentWallets?.length ? (
            <StyledWalletWrp>
              <span>{currentWallets[0]}</span>
              <StyledWalletOverlay />
            </StyledWalletWrp>
          ) : (
            <StyledConnectionBtn
              disabled={connectionInProgress}
              type="button"
              onClick={connectionHandle}
            >
              <span>
                {connectionInProgress
                  ? "Pleas open MetaMask to connect"
                  : "Get wallet"}
              </span>

              <StyledLogo
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="MetaMask"
              />
            </StyledConnectionBtn>
          )}
        </Layout>
      </StyledMain>

      <ModalInfo isShow={isShowModalInfo} closeModal={closeModalModalInfo} />
      <ModalNoAcc isShow={isShowModalNoAcc} closeModal={closeModalNoAcc} />
    </>
  );
};

export default MainContent;

const StyledConnectionBtn = styled.button`
  padding: 8px;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: none;
  width: content-box;
  background: #eee;
  border-radius: 5px;
  color: #494949;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.4);
    cursor: progress;
  }
`;

const StyledLogo = styled.img`
  max-width: 50px;
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
