import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-[var(--duration-base)] ease-[var(--ease-out)] disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#003399] to-[#0A84FF] text-white rounded-full hover:brightness-110 glow-blue active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-base)]',
    secondary: 'bg-transparent border border-[var(--color-bg-border)] text-[var(--color-text-primary)] rounded-full hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-glow)] active:scale-[0.97]',
    tertiary: 'text-[var(--color-primary)] hover:underline',
    danger: 'bg-[var(--color-accent-red)] text-white rounded-full hover:brightness-110 active:scale-[0.97]',
  };

  const sizeStyles = {
    sm: 'px-[18px] py-[10px] text-[13px]',
    md: 'px-[28px] py-[12px] text-[15px]',
    lg: 'px-[36px] py-[16px] text-[17px]',
    xl: 'px-[48px] py-[20px] text-[20px]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}
