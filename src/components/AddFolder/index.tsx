import plusIcon from "../../assets/icons/plus2.svg";
import "./index.css";

interface AddFolderProps {
  text: string;
  onClick: () => void;
}

const AddFolder: React.FC<AddFolderProps> = ({ text, onClick }) => {
  return (
    <div className='addFolderContainer'>
      <button className='addFolder' onClick={onClick}>
        <img src={plusIcon} alt='Plus' />
        <span>{text}</span>
      </button>
    </div>
  );
};

export default AddFolder;
