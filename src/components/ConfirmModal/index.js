import React, { useEffect } from "react";

import ReactPortal from "./ReactPortal";
import Button from "../RippleButton";

import './style.css';

function ConfirmModal({
                        handleClose,
                        isOpen,
                        confirmAction,
                        btnTitle,
                        title,
                        description,
                      }) {
  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    if (isOpen && window.innerWidth > 767) {
      document.getElementById('root').style.filter = 'blur(2px)';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.getElementById('root').style.filter = '';
    };
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <ReactPortal wrapperId="react-portal-confirm-modal-container">
      <div className="confirm-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div>{title}</div>
            <button onClick={handleClose} className="close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
          </div>

          <div className="modal-description">{description}</div>

          <div className="btn-block">
            <Button
              text={btnTitle}
              colorOne="#0162c8"
              colorTwo="#55e7fc"
              onClick={confirmAction}
            />
            <Button
              text="Cancel"
              colorOne="#755bea"
              colorTwo="#ff72c0"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </ReactPortal>
  );
}

export default ConfirmModal;
