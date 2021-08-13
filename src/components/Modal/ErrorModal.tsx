import React from "react";
import Modal from "react-modal";

import "./styles/errorModal.scss";

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
};

Modal.setAppElement("#root");

export const ErrorModal = ({ isOpen, onRequestClose }: ModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal_container"
      overlayClassName="modal_overlay"
    >
      <h2>Um erro ocorreu ao carregar dados do filme</h2>
    </Modal>
  );
};
