import React from "react";
import { Button } from "./Button";
import { ModalDates } from "./ModalDates";

export function Modal({
  meetings,
  isOpen,
  onClose,
  onsetRelationship,
  onGetRelationship,
  boyfriend,
}) {
  return (
    <>
      <div className={isOpen === true ? "modal" : "modal hidden"}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <div>
          <ModalDates
            meetings={meetings}
            onsetRelationship={onsetRelationship}
            boyfriend={boyfriend}
          />
          <Button
            onClick={() => {
              onGetRelationship();
            }}
          >
            Let's get together!
          </Button>
        </div>
      </div>
      <div
        className={isOpen === true ? "overlay" : "overlay hidden"}
        onClick={onClose}
      ></div>
    </>
  );
}
