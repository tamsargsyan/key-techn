import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";
import eyeIcon from "../../assets/icons/eye.svg";
import copyIcon from "../../assets/icons/copy.svg";
import lockIcon from "../../assets/icons/lock.svg";
import historyIcon from "../../assets/icons/history.svg";
import modifyIcon from "../../assets/icons/modify.svg";
import urlIcon from "../../assets/icons/url.svg";
import Popup from "../Popup";
import { NotificationType } from "../../Notification";
import "./index.css";

const ThirdPart = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = useCallback(
    (type: NotificationType, message: string) => {
      api[type]({
        message,
        placement: "bottomRight",
      });
    },
    [api]
  );

  const activatedFolderName = useSelector((state: any) => state.folder?.name);
  const activatedPassword = useSelector((state: any) => state.password);

  const btns = [
    { id: 1, name: "access", rusName: "Доступ", url: lockIcon },
    { id: 2, name: "settings", rusName: "История", url: historyIcon },
    { id: 3, name: "modify", rusName: "Изменить", url: modifyIcon },
    { id: 4, name: "link", rusName: "Ссылка", url: urlIcon },
  ];
  const initialInputs = useMemo(
    () => [
      {
        id: 1,
        name: "Название",
        type: "text",
        inputId: "name",
        value: activatedFolderName,
      },
    ],
    [activatedFolderName]
  );

  const [inputs, setInputs] = useState(initialInputs);
  useEffect(() => {
    if (activatedPassword) {
      setInputs([
        {
          id: 1,
          name: "Логин",
          type: "email",
          inputId: "login",
          value: activatedPassword.login,
        },
        {
          id: 2,
          name: "Пароль",
          type: "password",
          inputId: "password",
          value: activatedPassword.pass,
        },
        {
          id: 3,
          name: "URL",
          type: "text",
          inputId: "url",
          value: activatedPassword.url,
        },
      ]);
    } else setInputs(initialInputs);
  }, [activatedPassword, initialInputs]);
  const handleChange = useCallback((txt: string, inputId: string) => {
    setInputs(prevInputs =>
      prevInputs.map(input =>
        input.inputId === inputId ? { ...input, value: txt } : input
      )
    );
  }, []);
  const copyToClipboard = useCallback(
    (id: number) => {
      const valueToCopy =
        id === 4 && activatedPassword
          ? activatedPassword.url
          : inputs.find(input => input.id === id)?.value || "";
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => openNotificationWithIcon("success", "Успешно скопировано"))
        .catch(() => openNotificationWithIcon("error", "Ошибка"));
    },
    [inputs, openNotificationWithIcon, activatedPassword]
  );

  const passwordRef = useRef<HTMLInputElement>(null);
  const showPassword = useCallback((e: any) => {
    e.preventDefault();
    if (passwordRef.current) {
      const inputElement = passwordRef.current;
      inputElement.type =
        inputElement.type === "password" ? "text" : "password";
    }
  }, []);
  const [openPopup, setOpenPopup] = useState({
    open: false,
    name: "",
    rusName: "",
  });
  const [textArea, setTextArea] = useState("");
  const maxCharacterLimit = 1200;
  const isExceedingLimit = textArea.length > maxCharacterLimit;

  return (
    <div className='thirdPartContainer'>
      <div className='heading'>
        {!activatedPassword ? activatedFolderName : activatedPassword?.url}
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
                onClick={() => copyToClipboard(input.id)}>
                <img src={copyIcon} alt='Copy' />
              </button>
            </div>
          ))}
          <div className='formGroup textArea'>
            <label htmlFor='message'>
              {!activatedPassword ? "Описание" : "Комментарий"}:
            </label>
            <textarea
              className={`${isExceedingLimit && "maxSymbolTextArea"} scrollbar`}
              value={textArea}
              onChange={e => setTextArea(e.target.value)}
              rows={4}
              cols={80}
            />
            <span
              className={`${
                isExceedingLimit && "showMaxSymbolText"
              } maxSymbolTxt`}>
              Максимально колличество символов 1200
            </span>
          </div>
          <div className={`${isExceedingLimit && "maxSizeFormBtns"} formBtns`}>
            {btns.map(({ id, name, rusName, url }) => (
              <button
                className='formBtn'
                disabled={id === 4 && !activatedPassword}
                key={id}
                onClick={e => {
                  e.preventDefault();
                  id !== 4
                    ? setOpenPopup({
                        open: true,
                        name,
                        rusName,
                      })
                    : copyToClipboard(4);
                }}>
                <img src={url} alt={name} />
                {rusName}
              </button>
            ))}
          </div>
        </form>
      </div>
      {contextHolder}
      {openPopup.open && (
        <Popup
          modify={openPopup.name === "modify"}
          onClose={() =>
            setOpenPopup({
              open: false,
              name: "",
              rusName: "",
            })
          }
          header={openPopup.rusName}
          content={openPopup.name}
        />
      )}
    </div>
  );
};

export default ThirdPart;
