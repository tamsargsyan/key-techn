import "./index.css";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  background: string;
}
const Button: React.FC<ButtonProps> = ({ onClick, text, background }) => {
  return (
    <button className='btn' style={{ background }} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
