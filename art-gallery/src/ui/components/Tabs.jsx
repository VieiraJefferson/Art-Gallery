import React, { createContext, useContext, useState } from 'react';
import './Tabs.scss';

// Context para compartilhar estado entre Tabs
const TabsContext = createContext(null);

/**
 * Tabs Container
 * 
 * @param {Object} props
 * @param {string} props.defaultValue - Tab ativa inicial
 * @param {string} props.value - Tab ativa (controlado)
 * @param {Function} props.onChange - Callback quando muda a tab
 * @param {'default' | 'pills' | 'underline'} props.variant
 * @param {'sm' | 'md' | 'lg'} props.size
 */
export const Tabs = ({
  defaultValue,
  value: controlledValue,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  return (
    <TabsContext.Provider value={{ value, onChange: handleChange, variant, size }}>
      <div className={`ui-tabs ui-tabs--${variant} ${className}`} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * TabsList - Container dos triggers
 */
export const TabsList = ({ className = '', children, ...props }) => {
  const { variant, size } = useContext(TabsContext);
  
  return (
    <div 
      className={`ui-tabs__list ui-tabs__list--${variant} ui-tabs__list--${size} ${className}`}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * TabsTrigger - Botão individual de tab
 */
export const TabsTrigger = ({ 
  value: tabValue, 
  disabled = false,
  className = '',
  children,
  ...props 
}) => {
  const { value, onChange, variant } = useContext(TabsContext);
  const isActive = value === tabValue;
  
  const classNames = [
    'ui-tabs__trigger',
    `ui-tabs__trigger--${variant}`,
    isActive && 'ui-tabs__trigger--active',
    disabled && 'ui-tabs__trigger--disabled',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type="button"
      role="tab"
      className={classNames}
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => !disabled && onChange(tabValue)}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * TabsContent - Conteúdo de cada tab
 */
export const TabsContent = ({ 
  value: tabValue,
  className = '',
  children,
  ...props 
}) => {
  const { value } = useContext(TabsContext);
  
  if (value !== tabValue) return null;
  
  return (
    <div
      role="tabpanel"
      className={`ui-tabs__content ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Tabs;
