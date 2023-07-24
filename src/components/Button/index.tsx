import "./index.css";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  background: string;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  background,
  disabled,
}) => {
  return (
    <button
      className='btn'
      style={{ background }}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
