import { useState } from "react";
import AddUser from "../AddUser";
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
              <AddUser className='' onClose={() => setId(null)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SettingsContent;
