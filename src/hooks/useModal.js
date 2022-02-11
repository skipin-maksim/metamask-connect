import { useState } from "react";

const useModal = () => {
  const [isShow, setIsShow] = useState(false);

  const openModal = () => setIsShow(true);
  const closeModal = () => setIsShow(false);

  return { isShow, openModal, closeModal };
};

export default useModal;
