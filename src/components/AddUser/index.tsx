import { useRef } from "react";
import PLUS_ICON from "../../assets/icons/plus.svg";
import DOWN_ICON from "../../assets/icons/down.svg";
import CLOSE_ICON from "../../assets/icons/close.svg";
import "./index.css";

interface NameItemProps {
  index: number;
  toggleDropDown: (lawId: number) => void;
  openedDropdownId: number | null;
}

interface AddUserProps {
  className: string;
  onClose: () => void | undefined;
}

const NameItem: React.FC<NameItemProps> = ({
  index,
  toggleDropDown,
  openedDropdownId,
}) => {
  const dropDownMenu = [
    {
      id: 1,
      name: "Полный",
    },
    {
      id: 2,
      name: "Чтение",
    },
    {
      id: 3,
      name: "Пусто",
    },
  ];

  return (
    <div className='name'>
      <div>
        <img src={PLUS_ICON} alt='Plus' />
        <div className='frame'></div>
        <span>Имя Фамилия</span>
      </div>
      <button className='lawBtn' onClick={() => toggleDropDown(index + 1)}>
        Права
        <img src={DOWN_ICON} alt='Down' />
        <div
          className={`dropDownMenu ${
            openedDropdownId === index + 1 ? "dropDownMenuOpen" : ""
          }`}>
          {dropDownMenu.map(drop => (
            <div className='drop' key={drop.id}>
              {drop.name}
            </div>
          ))}
        </div>
      </button>
    </div>
  );
};

const AddUser: React.FC<AddUserProps> = ({ className, onClose }) => {
  const openedDropdownIdRef = useRef<number | null>(null);

  const toggleDropDown = (lawId: number) => {
    openedDropdownIdRef.current =
      openedDropdownIdRef.current === lawId ? null : lawId;
  };

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
                <NameItem
                  key={i}
                  index={i}
                  toggleDropDown={toggleDropDown}
                  openedDropdownId={openedDropdownIdRef.current}
                />
              ))}
          </div>
        </div>
      </div>
      <button className='saveBtn'>Сохранить</button>
      <button className='cancelBtn' onClick={onClose}>
        Отменить
      </button>
    </div>
  );
};

export default AddUser;
