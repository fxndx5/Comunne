import { ModalMessage, ModalType } from "@/components/ModalMessage";
import React, { createContext, ReactNode, useState } from "react";
// import { ModalMessage, ModalType } from "../components/ModalMessage";

interface ModalState {
  visible: boolean;
  type: ModalType;
  title?: string;
  message: string;
}

interface ModalContextValue {
  showModal: (config: Omit<ModalState, "visible">) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined
);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const showModal = (config: Omit<ModalState, "visible">) => {
    setModalState({
      visible: true,
      ...config,
    });
  };

  const hideModal = () => {
    setModalState((prev) =>
      prev ? { ...prev, visible: false } : { visible: false, type: "info", message: "" }
    );
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      <ModalMessage
        visible={modalState?.visible ?? false}
        type={modalState?.type ?? "info"}
        title={modalState?.title}
        message={modalState?.message ?? ""}
        onClose={hideModal}
      />
    </ModalContext.Provider>
  );
}
