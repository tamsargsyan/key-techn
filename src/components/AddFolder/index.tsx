import plusIcon from "../../assets/icons/plus2.svg";
import "./index.css";

interface AddFolderProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const AddFolder: React.FC<AddFolderProps> = ({ text, onClick, disabled }) => {
  return (
    <div className='addFolderContainer'>
      <button className='addFolder' onClick={onClick} disabled={disabled}>
        <img src={plusIcon} alt='Plus' />
        <span>{text}</span>
      </button>
    </div>
  );
};

export default AddFolder;
