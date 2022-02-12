import Modal from "./Modal";

const ModalNoAcc = props => {
  return (
    <Modal {...props} header="Account not found">
      <p>Account not found. Connect to MetaMask!</p>
    </Modal>
  );
};

export default ModalNoAcc;
