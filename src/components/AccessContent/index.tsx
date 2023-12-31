import { useState } from "react";
import USER_1 from "../../assets/people/1.png";
import USER_2 from "../../assets/people/2.png";
import USER_3 from "../../assets/people/3.png";
import USER_4 from "../../assets/people/4.png";
import DELETE_ICON from "../../assets/icons/delete.svg";
import DropdownComponent from "../Dropdown";
import AddUser from "../AddUser";
import "./index.css";

const AccessContent = () => {
  const users = [
    {
      id: 1,
      name: "Фамилия Имя Отчество",
      img: USER_1,
      law: "Редактирование",
    },
    {
      id: 2,
      name: "Фамилия Имя Отчество",
      img: USER_2,
      law: "Чтение",
    },
    {
      id: 3,
      name: "Фамилия Имя Отчество",
      img: USER_3,
      law: "Редактирование",
    },
    {
      id: 4,
      name: "Фамилия Имя Отчество",
      img: USER_4,
      law: "Редактирование",
    },
  ];
  const [addUser, setAddUser] = useState(false);
  return (
    <div className='accessContentContainer'>
      <div className='users'>
        {users.map(user => {
          return (
            <div className='user' key={user.id}>
              <div className='userName'>
                <img src={user.img} alt='User' />
                <span>{user.name}</span>
              </div>
              <div className='edit'>
                <DropdownComponent name={user.law} />
                <button className='deleteBtn'>
                  <img src={DELETE_ICON} alt='Delete' />
                </button>
              </div>
            </div>
          );
        })}
        {!addUser && (
          <button className='addUserBtn' onClick={() => setAddUser(true)}>
            Добавить пользователя
          </button>
        )}
      </div>
      {addUser && (
        <AddUser
          className='infoSettingsBorder'
          onClose={() => setAddUser(false)}
        />
      )}
    </div>
  );
};

export default AccessContent;
