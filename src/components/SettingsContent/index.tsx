import { useState } from "react";
import PLUS_ICON from "../../assets/icons/plus.svg";
import DOWN_ICON from "../../assets/icons/down.svg";
import "./index.css";

const SettingsContent = () => {
  const [id, setId] = useState<null | number>(null);
  const btns = [
    {
      id: 1,
      name: "Импорт паролей",
    },
    {
      id: 2,
      name: "Экспорт данных в .CSV",
    },
    {
      id: 3,
      name: "Получить отчет действий пользователей",
    },
    {
      id: 4,
      name: "Отредактировать права на корневую папку",
    },
    {
      id: 5,
      name: "Забрать права",
    },
  ];
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
  console.log(dropDownMenu);
  const [openedDropdownId, setOpenedDropdownId] = useState<null | number>(null);

  const toggleDropDown = (lawId: number) => {
    setOpenedDropdownId(prevId => (prevId === lawId ? null : lawId));
  };
  return (
    <div className='settingsContainer'>
      {btns.map(btn => {
        return (
          <div key={btn.id} className='settingsBtn'>
            <div className='settingsBtnWrapper'>
              <button
                className={`${btn.id === id && "active"} btn`}
                onClick={() => setId(btn.id)}>
                {btn.name}
              </button>
            </div>
            {((btn.id === id && id === 5) || (btn.id === id && id === 4)) && (
              <div className='infoSettings'>
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
                              openedDropdownId === i + 1
                                ? "dropDownMenuOpen"
                                : ""
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
                  <button className='saveBtn'>Сохранить</button>
                  <button className='cancelBtn'>Отменить</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SettingsContent;
