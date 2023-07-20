import { useState } from "react";
import PLUS_ICON from "../../assets/icons/plus.svg";
import DOWN_ICON from "../../assets/icons/down.svg";
import CLOSE_ICON from "../../assets/icons/close.svg";
import "./index.css";

interface AddUserProps {
  className: string;
  onClose: () => void | undefined;
}

const AddUser: React.FC<AddUserProps> = ({ className, onClose }) => {
  const names = Array(5).fill(null);
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
  const toggleDropDown = (lawId: number) => {
    setOpenedDropdownId(prevId => (prevId === lawId ? null : lawId));
  };
  const [openedDropdownId, setOpenedDropdownId] = useState<null | number>(null);

  return (
    <div className='addUserContainer'>
      <div className={`${className} infoSettings`}>
        {className ? (
          <div className='addUserHeader'>
            <span>Добавление новых пользователей</span>
            <button onClick={onClose}>
              <img src={CLOSE_ICON} alt='Close' />
            </button>
          </div>
        ) : null}
        <div className='infoSettingsContent'>
          <input placeholder='Поиск...' />
          <div className='names'>
            {names.map((_, i) => {
              return (
                <div className='name' key={i}>
                  <div>
                    <img src={PLUS_ICON} alt='Plus' />
                    <div className='frame'></div>
                    <span>Имя Фамилия</span>
                  </div>
                  <button
                    className='lawBtn'
                    onClick={() => toggleDropDown(i + 1)}>
                    Права
                    <img src={DOWN_ICON} alt='Down' />
                    <div
                      className={`dropDownMenu ${
                        openedDropdownId === i + 1 ? "dropDownMenuOpen" : ""
                      }`}>
                      {dropDownMenu.map(drop => {
                        return (
                          <div className='drop' key={drop.id}>
                            {drop.name}
                          </div>
                        );
                      })}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button className='saveBtn'>Сохранить</button>
      <button className='cancelBtn'>Отменить</button>
    </div>
  );
};

export default AddUser;
