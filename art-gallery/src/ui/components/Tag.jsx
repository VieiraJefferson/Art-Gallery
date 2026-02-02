import React from 'react';
import './Tag.scss';

/**
 * Tag/Badge Component
 * 
 * @param {Object} props
 * @param {'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'} props.variant
 * @param {'sm' | 'md' | 'lg'} props.size
 * @param {boolean} props.outlined - Se é apenas outline
 * @param {boolean} props.removable - Se pode ser removido
 * @param {Function} props.onRemove - Callback ao remover
 * @param {React.ReactNode} props.leftIcon - Ícone à esquerda
 * @param {string} props.className
 * @param {React.ReactNode} props.children
 */
export const Tag = ({
  variant = 'default',
  size = 'md',
  outlined = false,
  removable = false,
  onRemove,
  leftIcon,
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'ui-tag',
    `ui-tag--${variant}`,
    `ui-tag--${size}`,
    outlined && 'ui-tag--outlined',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {leftIcon && <span className="ui-tag__icon">{leftIcon}</span>}
      <span className="ui-tag__text">{children}</span>
      {removable && (
        <button 
          type="button"
          className="ui-tag__remove"
          onClick={onRemove}
          aria-label="Remover"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

/**
 * Badge - Indicador numérico ou de status
 */
export const Badge = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}) => {
  const classNames = [
    'ui-badge',
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    dot && 'ui-badge--dot',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {!dot && children}
    </span>
  );
};

/**
 * BadgeWrapper - Wrapper para posicionar badge em elementos
 */
export const BadgeWrapper = ({ 
  children, 
  badge,
  position = 'top-right',
  className = '',
  ...props 
}) => {
  const classNames = [
    'ui-badge-wrapper',
    `ui-badge-wrapper--${position}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
      {badge}
    </div>
  );
};

export default Tag;
