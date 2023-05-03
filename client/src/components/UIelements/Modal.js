import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';

const Modal = ({
  className = '',
  children,
  isOpen,
  toggleModal,
  offsetRef = null,
  modalId,
  isScrolling = true
}) => {
  const modalElement = document.getElementById(`${modalId}`);

  useEffect(() => {
    if (!isOpen) return;
    const offsetElementReqt = offsetRef
      ? offsetRef.current.getBoundingClientRect()
      : {};
    const { left = 0 } = offsetElementReqt;
    modalElement.firstChild.style.left = `${left}px`;
    modalElement.firstChild.style.top = `${0}px`;
  }, [isOpen]);

  useEffect(() => {
    if (modalElement) {
      modalElement.addEventListener('click', (e) => {
        toggleModal(!isOpen);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!modalElement.firstChild) return;

    if (isOpen) {
      modalElement.firstChild.classList.add('modal__child--open');
      const classes = className ? className.split(' ') : '';
      if (classes.length)
        classes.forEach((item) => {
          modalElement.classList.add(item);
        });
      modalElement.classList.add('modal');
      if (!isScrolling) document.body.style.overflow = 'hidden';
    } else modalElement.firstChild.classList.remove('modal__child--open');

    return () => {
      modalElement.classList.remove('modal');
      modalElement.classList.remove('modal--full-vh');
      document.body.style.overflow = 'scroll';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(children, modalElement);
};

export default Modal;
