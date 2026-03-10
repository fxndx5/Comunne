import { useContext } from "react";
import { ModalContext } from "../providers/ModalProvider";

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal debe usarse dentro de un ModalProvider");
  }

  return context;
}
