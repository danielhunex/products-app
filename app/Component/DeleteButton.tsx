"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteProduct } from "../ApiClient/ApiClient";

export interface DeleteButtonProps {
  itemId: string;
}

const DeleteButton = ({ itemId }: DeleteButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteClick = () => {
    setOpen(!open);
  };

  const handleYesClick = async () => {
    await deleteProduct(itemId);
    setOpen(false)
    router.prefetch("/products");
    router.push("/products");
  };
  const handleNoClick = () => {
    setOpen(false);
  };
  return (
    <>
      <button>
        <FiTrash2
          className="text-red-400"
          size={25}
          onClick={handleDeleteClick}
        />
      </button>
      <Modal open={open}>
        <h3 className="font-bold text-lg">
          Are you sure you want to delete this product?
        </h3>

        <div className="modal-action">
          <button className="btn btn-secondary" onClick={handleYesClick}>
            Yes
          </button>
          <button className="btn btn-primary" onClick={handleNoClick}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
