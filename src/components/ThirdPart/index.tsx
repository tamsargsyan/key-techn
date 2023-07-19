import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import eyeIcon from "../../assets/icons/eye.svg";
import copyIcon from "../../assets/icons/copy.svg";
import lockIcon from "../../assets/icons/lock.svg";
import historyIcon from "../../assets/icons/history.svg";
import modifyIcon from "../../assets/icons/modify.svg";
import urlIcon from "../../assets/icons/url.svg";
import { notification } from "antd";
import { NotificationType } from "../../Notification";
import "./index.css";

const ThirdPart = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message,
      placement: "bottomRight",
    });
  };
  const activatedFolderName = useSelector((state: any) => state.folder?.name);
  const activatedPassword = useSelector((state: any) => state.password);
  const [isActivePass, setIsActivePass] = useState(false);
  useEffect(() => {
    setIsActivePass(!!activatedPassword);
  }, [activatedPassword]);
  console.log(isActivePass);
  const [inputs, setInputs] = useState(
    !isActivePass
      ? [
          {
            id: 1,
            name: "Название",
            type: "text",
            inputId: "name",
            value: "",
          },
        ]
      : [
          {
            id: 1,
            name: "Логин",
            type: "email",
            inputId: "login",
            value: "",
          },
          {
            id: 2,
            name: "Пароль",
            type: "password",
            inputId: "password",
            value: "",
          },
          {
            id: 3,
            name: "URL",
            type: "text",
            inputId: "url",
            value: "",
          },
        ]
  );
  console.log(inputs);
  useEffect(() => {
    if (isActivePass && inputs.length > 0) {
      setInputs(prevInputs => [
        { ...prevInputs[0], value: activatedFolderName },
        ...prevInputs.slice(1),
      ]);
    }
  }, [isActivePass, inputs.length, activatedFolderName]);
  const handleChange = (txt: string, inputId: string) => {
    setInputs(prevInputs =>
      prevInputs.map(input =>
        input.inputId === inputId ? { ...input, value: txt } : input
      )
    );
  };
  const copyToClipboard = (id: number) => {
    const valueToCopy = inputs.find(input => input.id === id)?.value || "";
    navigator.clipboard
      .writeText(valueToCopy)
      .then(() => openNotificationWithIcon("success", "Успешно скопировано"))
      .catch(() => openNotificationWithIcon("error", "Ошибка"));
  };
  const passwordRef = useRef<HTMLInputElement>(null);
  const showPassword = (e: any) => {
    e.preventDefault();
    if (passwordRef.current) {
      const inputElement = passwordRef.current;
      inputElement.type =
        inputElement.type === "password" ? "text" : "password";
    }
  };
  return (
    <div className='thirdPartContainer'>
      <div className='heading'>
        {!isActivePass ? activatedFolderName : "3nv.ru"}
      </div>
      <div className='content'>
        <form>
          {inputs.map(input => (
            <div className='formGroup' key={input.inputId}>
              <label htmlFor={input.inputId}>{input.name}:</label>
              <input
                type={input.type}
                id={input.inputId}
                name={input.inputId}
                value={input.value}
                autoComplete={input.id === 2 ? "current-password" : undefined}
                ref={input.id === 2 ? passwordRef : null}
                onChange={e => handleChange(e.target.value, input.inputId)}
                required
              />
              {input.id === 2 && (
                <button className='eye copy' onClick={showPassword}>
                  <img src={eyeIcon} alt='Eye' />
                </button>
              )}
              <button
                className='copy'
                onClick={e => {
                  e.preventDefault();
                  copyToClipboard(input.id);
                }}>
                <img src={copyIcon} alt='Copy' />
              </button>
            </div>
          ))}
          <div className='formGroup textArea'>
            <label htmlFor='message'>
              {!isActivePass ? "Описание" : "Комментарий"}:
            </label>
            <textarea id='message' name='message' rows={4} required></textarea>
          </div>
          <div className='formBtns'>
            {[
              { id: 1, name: "Доступ", url: lockIcon },
              { id: 2, name: "История", url: historyIcon },
              { id: 3, name: "Изменить", url: modifyIcon },
              { id: 4, name: "Ссылка", url: urlIcon },
            ].map(btn => (
              <button className='formBtn' key={btn.id}>
                <img src={btn.url} alt={btn.name} />
                {btn.name}
              </button>
            ))}
          </div>
        </form>
      </div>
      {contextHolder}
    </div>
  );
};

export default ThirdPart;
