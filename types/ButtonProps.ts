interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'icon' | 'xs' | 'sm' | 'md' | 'lg';
  link?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  ring?: boolean;
  shiny?: boolean;
}

export default ButtonProps;
