"use client";

import React, { useState } from "react";

export interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

const Modal = ({ children, open }: ModalProps) => {
  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        open ? "modal-open" : ""
      }`}
    >
      <div className="modal-box">{children}</div>
    </div>
  );
};

export default Modal;
