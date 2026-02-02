import React from 'react';
import './Button.scss';

/**
 * Button Component
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} props.variant - Estilo do botão
 * @param {'sm' | 'md' | 'lg'} props.size - Tamanho do botão
 * @param {boolean} props.fullWidth - Se deve ocupar toda a largura
 * @param {boolean} props.disabled - Se está desabilitado
 * @param {boolean} props.loading - Se está em estado de loading
 * @param {React.ReactNode} props.leftIcon - Ícone à esquerda
 * @param {React.ReactNode} props.rightIcon - Ícone à direita
 * @param {string} props.className - Classes adicionais
 * @param {React.ReactNode} props.children - Conteúdo do botão
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  as: Component = 'button',
  ...props
}) => {
  const classNames = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth && 'ui-button--full-width',
    loading && 'ui-button--loading',
    disabled && 'ui-button--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      className={classNames}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="ui-button__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="ui-button__spinner-svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
      )}
      {!loading && leftIcon && (
        <span className="ui-button__icon ui-button__icon--left">{leftIcon}</span>
      )}
      <span className="ui-button__text">{children}</span>
      {!loading && rightIcon && (
        <span className="ui-button__icon ui-button__icon--right">{rightIcon}</span>
      )}
    </Component>
  );
};

/**
 * IconButton - Botão apenas com ícone
 */
export const IconButton = ({
  variant = 'ghost',
  size = 'md',
  icon,
  label,
  className = '',
  ...props
}) => {
  const classNames = [
    'ui-icon-button',
    `ui-icon-button--${variant}`,
    `ui-icon-button--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
};

export default Button;
