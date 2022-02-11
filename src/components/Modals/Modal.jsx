import { useEffect } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

const Modal = ({ children, isShow, closeModal, header }) => {
  useEffect(() => {
    const modalHandle = e => {
      e.target.classList.value.includes("overlay") && closeModal();
    };

    isShow && window.addEventListener("click", modalHandle);
    return () => {
      window.removeEventListener("click", modalHandle);
    };
  }, [closeModal, isShow]);

  return (
    <>
      {isShow && (
        <StyledOverlay className="overlay">
          <StyledModal>
            <StyledModalHeader>
              <span>{header}</span>
              <FiX className="close-btn" onClick={closeModal} />
            </StyledModalHeader>

            <StyledModalBody>{children}</StyledModalBody>
          </StyledModal>
        </StyledOverlay>
      )}
    </>
  );
};

export default Modal;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(201, 201, 201, 0.15);
  backdrop-filter: blur(2px);
  z-index: 10;
`;

const StyledModal = styled.div`
  min-width: 300px;
  max-width: 490px;
  background: #fff;
  border-radius: 5px;
  color: #000;
  font-size: 18px;
`;

const StyledModalHeader = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #8b8b8b;
  font-weight: 600;

  & .close-btn {
    cursor: pointer;
    font-size: 25px;
  }
`;

const StyledModalBody = styled.div`
  text-align: center;
  padding: 20px;
`;
