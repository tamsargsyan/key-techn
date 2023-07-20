import SettingsContent from "../SettingsContent";
import AccessContent from "../AccessContent";
import CLOSE_ICON from "../../assets/icons/close.svg";
import "./index.css";

interface PopupProps {
  header: string;
  onClose: () => void;
  content: string;
}

const contentComponents: { [key: string]: React.FC } = {
  access: AccessContent,
  settings: SettingsContent,
};

const Popup: React.FC<PopupProps> = ({ header, content, onClose }) => {
  const ContentComponent = contentComponents[content];

  return (
    <div className='overlay' onClick={onClose}>
      <div
        className='popupContainer'
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className='popupHeader'>
          <span>{header}</span>
          <button>
            <img src={CLOSE_ICON} alt='Close' />
          </button>
        </div>
        <div className='popupContent'>
          {ContentComponent ? (
            <ContentComponent />
          ) : (
            <div>Content not found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
