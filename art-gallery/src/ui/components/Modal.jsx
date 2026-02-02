import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

/**
 * Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.open - Se o modal está aberto
 * @param {Function} props.onClose - Callback ao fechar
 * @param {'sm' | 'md' | 'lg' | 'xl' | 'full'} props.size
 * @param {boolean} props.closeOnOverlay - Se fecha ao clicar no overlay
 * @param {boolean} props.closeOnEscape - Se fecha com ESC
 * @param {boolean} props.showClose - Se mostra botão de fechar
 * @param {string} props.className
 * @param {React.ReactNode} props.children
 */
export const Modal = ({
  open,
  onClose,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  showClose = true,
  className = '',
  children,
  ...props
}) => {
  // Handle ESC key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose?.();
    }
  }, [closeOnEscape, onClose]);
  
  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, handleEscape]);
  
  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose?.();
    }
  };
  
  if (!open) return null;
  
  const classNames = [
    'ui-modal__content',
    `ui-modal__content--${size}`,
    className
  ].filter(Boolean).join(' ');
  
  return createPortal(
    <div className="ui-modal" role="dialog" aria-modal="true" {...props}>
      <div className="ui-modal__overlay" onClick={handleOverlayClick}>
        <div className={classNames}>
          {showClose && (
            <button
              type="button"
              className="ui-modal__close"
              onClick={onClose}
              aria-label="Fechar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * ModalHeader
 */
export const ModalHeader = ({ children, className = '', ...props }) => (
  <div className={`ui-modal__header ${className}`} {...props}>
    {children}
  </div>
);

/**
 * ModalTitle
 */
export const ModalTitle = ({ 
  children, 
  as: Component = 'h2',
  className = '', 
  ...props 
}) => (
  <Component className={`ui-modal__title ${className}`} {...props}>
    {children}
  </Component>
);

/**
 * ModalDescription
 */
export const ModalDescription = ({ children, className = '', ...props }) => (
  <p className={`ui-modal__description ${className}`} {...props}>
    {children}
  </p>
);

/**
 * ModalBody
 */
export const ModalBody = ({ children, className = '', ...props }) => (
  <div className={`ui-modal__body ${className}`} {...props}>
    {children}
  </div>
);

/**
 * ModalFooter
 */
export const ModalFooter = ({ children, className = '', ...props }) => (
  <div className={`ui-modal__footer ${className}`} {...props}>
    {children}
  </div>
);

export default Modal;
