import React, { forwardRef } from 'react';
import './Input.scss';

/**
 * Input Component
 * 
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} props.size
 * @param {boolean} props.error - Se tem erro
 * @param {boolean} props.disabled
 * @param {boolean} props.fullWidth
 * @param {React.ReactNode} props.leftIcon
 * @param {React.ReactNode} props.rightIcon
 * @param {React.ReactNode} props.leftAddon
 * @param {React.ReactNode} props.rightAddon
 * @param {string} props.className
 */
export const Input = forwardRef(({
  size = 'md',
  error = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  leftAddon,
  rightAddon,
  className = '',
  ...props
}, ref) => {
  const wrapperClassNames = [
    'ui-input-wrapper',
    `ui-input-wrapper--${size}`,
    error && 'ui-input-wrapper--error',
    disabled && 'ui-input-wrapper--disabled',
    fullWidth && 'ui-input-wrapper--full-width',
    (leftIcon || leftAddon) && 'ui-input-wrapper--has-left',
    (rightIcon || rightAddon) && 'ui-input-wrapper--has-right',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassNames}>
      {leftAddon && <span className="ui-input__addon ui-input__addon--left">{leftAddon}</span>}
      {leftIcon && <span className="ui-input__icon ui-input__icon--left">{leftIcon}</span>}
      <input
        ref={ref}
        className="ui-input"
        disabled={disabled}
        {...props}
      />
      {rightIcon && <span className="ui-input__icon ui-input__icon--right">{rightIcon}</span>}
      {rightAddon && <span className="ui-input__addon ui-input__addon--right">{rightAddon}</span>}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea Component
 */
export const Textarea = forwardRef(({
  size = 'md',
  error = false,
  disabled = false,
  fullWidth = false,
  rows = 4,
  resize = 'vertical',
  className = '',
  ...props
}, ref) => {
  const classNames = [
    'ui-textarea',
    `ui-textarea--${size}`,
    error && 'ui-textarea--error',
    disabled && 'ui-textarea--disabled',
    fullWidth && 'ui-textarea--full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <textarea
      ref={ref}
      className={classNames}
      disabled={disabled}
      rows={rows}
      style={{ resize }}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

/**
 * FormField - Wrapper para campos com label e erro
 */
export const FormField = ({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-form-field ${className}`} {...props}>
      {label && (
        <label htmlFor={htmlFor} className="ui-form-field__label">
          {label}
          {required && <span className="ui-form-field__required">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="ui-form-field__hint">{hint}</p>
      )}
      {error && (
        <p className="ui-form-field__error">{error}</p>
      )}
    </div>
  );
};

export default Input;
