import PLUS_ICON from "../../assets/icons/plus.svg";
import CLOSE_ICON from "../../assets/icons/close.svg";
import DropdownComponent from "../Dropdown";
import "./index.css";

interface AddUserProps {
  className: string;
  onClose: () => void | undefined;
}

const AddUser: React.FC<AddUserProps> = ({ className, onClose }) => {
  return (
    <div className='addUserContainer'>
      <div className={`${className} infoSettings`}>
        {className && (
          <div className='addUserHeader'>
            <span>Добавление новых пользователей</span>
            <button onClick={onClose}>
              <img src={CLOSE_ICON} alt='Close' />
            </button>
          </div>
        )}
        <div className='infoSettingsContent'>
          <input placeholder='Поиск...' />
          <div className='names'>
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div className='name' key={i}>
                  <div>
                    <img src={PLUS_ICON} alt='Plus' />
                    <div className='frame'></div>
                    <span>Имя Фамилия</span>
                  </div>
                  <DropdownComponent name='Права' />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className='saveCancelWrapper'>
        <button className='saveBtn'>Сохранить</button>
        <button className='cancelBtn' onClick={onClose}>
          Отменить
        </button>
      </div>
    </div>
  );
};

export default AddUser;
