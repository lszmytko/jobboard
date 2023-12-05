import Modal from "react-modal";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import {
  accceptButtonStyles,
  customDeleteModalStyles,
  rejectButtonStyles,
} from "./styles";
import { deleteEmployer } from "./deleteEmployer";
import { removeUserFromLocalStorage, removeUserToken } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { paths } from "@/common/paths";

const DeleteAccountModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const router = useRouter();
  const { isLoading, isError, mutateAsync } = useMutation({
    mutationFn: deleteEmployer,
    onSuccess: () => {
      removeUserFromLocalStorage();
      removeUserToken();
      toast.success("Konto pracodawcy usunięte");
      router.push(paths.home);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customDeleteModalStyles}
      contentLabel="Delete Modal"
    >
      <div className="flex justify-center items-center">
        <div>
          <p className="text-center">Czy na pewno chcesz usunąć konto?</p>
          <div className="flex mt-4 justify-center">
            <button
              className={accceptButtonStyles}
              onClick={() => mutateAsync()}
            >
              Tak
            </button>
            <button className={rejectButtonStyles} onClick={closeModal}>
              Nie
            </button>
          </div>
          {isError && (
            <p className="text-sm text-center text-red-700">Wystąpił błąd</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
