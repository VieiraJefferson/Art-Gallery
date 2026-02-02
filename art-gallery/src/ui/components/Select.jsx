import React, { forwardRef } from 'react';
import './Select.scss';

/**
 * Select Component
 * 
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} props.size
 * @param {boolean} props.error
 * @param {boolean} props.disabled
 * @param {boolean} props.fullWidth
 * @param {string} props.placeholder
 * @param {Array} props.options - Array de { value, label, disabled? }
 * @param {string} props.className
 */
export const Select = forwardRef(({
  size = 'md',
  error = false,
  disabled = false,
  fullWidth = false,
  placeholder,
  options = [],
  className = '',
  ...props
}, ref) => {
  const wrapperClassNames = [
    'ui-select-wrapper',
    `ui-select-wrapper--${size}`,
    error && 'ui-select-wrapper--error',
    disabled && 'ui-select-wrapper--disabled',
    fullWidth && 'ui-select-wrapper--full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassNames}>
      <select
        ref={ref}
        className="ui-select"
        disabled={disabled}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className="ui-select__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
