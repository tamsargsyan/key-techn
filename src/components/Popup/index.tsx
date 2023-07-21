import SettingsContent from "../SettingsContent";
import AccessContent from "../AccessContent";
import ModifyContent from "../ModifyContent";
import CLOSE_ICON from "../../assets/icons/close.svg";
import DELETE_ICON from "../../assets/icons/delete.svg";
import "./index.css";

interface PopupProps {
  header: string;
  onClose: () => void;
  content: string;
  modify: boolean;
}

const contentComponents: { [key: string]: React.FC } = {
  access: AccessContent,
  settings: SettingsContent,
  modify: ModifyContent,
};

const Popup: React.FC<PopupProps> = ({ header, content, onClose, modify }) => {
  const ContentComponent = contentComponents[content];

  return (
    <div className='overlay' onClick={onClose}>
      <div
        className='popupContainer'
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className='popupHeader'>
          <span>{header}</span>
          <div className='popupHeaderBtns'>
            {modify && (
              <button>
                <img src={DELETE_ICON} alt='Delete' />
              </button>
            )}
            <button onClick={onClose}>
              <img src={CLOSE_ICON} alt='Close' />
            </button>
          </div>
        </div>
        <div className='popupContent scrollbar'>
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
