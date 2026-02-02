import React from 'react';
import './Card.scss';

/**
 * Card Component
 * 
 * @param {Object} props
 * @param {'default' | 'elevated' | 'outlined'} props.variant - Estilo do card
 * @param {boolean} props.hoverable - Se tem efeito hover
 * @param {boolean} props.clickable - Se é clicável
 * @param {string} props.className - Classes adicionais
 * @param {React.ReactNode} props.children - Conteúdo do card
 */
export const Card = ({
  variant = 'default',
  hoverable = false,
  clickable = false,
  className = '',
  children,
  as: Component = 'div',
  ...props
}) => {
  const classNames = [
    'ui-card',
    `ui-card--${variant}`,
    hoverable && 'ui-card--hoverable',
    clickable && 'ui-card--clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};

/**
 * CardImage - Imagem do card
 */
export const CardImage = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`ui-card__image-wrapper ${className}`}
      style={{ aspectRatio }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="ui-card__image"
        loading="lazy"
        {...props}
      />
    </div>
  );
};

/**
 * CardHeader - Cabeçalho do card
 */
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`ui-card__header ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardBody - Corpo do card
 */
export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`ui-card__body ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardFooter - Rodapé do card
 */
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`ui-card__footer ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardTitle - Título do card
 */
export const CardTitle = ({ 
  children, 
  as: Component = 'h3',
  className = '', 
  ...props 
}) => (
  <Component className={`ui-card__title ${className}`} {...props}>
    {children}
  </Component>
);

/**
 * CardDescription - Descrição do card
 */
export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`ui-card__description ${className}`} {...props}>
    {children}
  </p>
);

export default Card;
