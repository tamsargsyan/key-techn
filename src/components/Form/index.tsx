import eyeIcon from "../../assets/icons/eye.svg";
import copyIcon from "../../assets/icons/copy.svg";
import { NotificationType } from "../../Notification";
import { notification } from "antd";
import lockIcon from "../../assets/icons/lock.svg";
import historyIcon from "../../assets/icons/history.svg";
import modifyIcon from "../../assets/icons/modify.svg";
import urlIcon from "../../assets/icons/url.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import arrowIcon from "../../assets/icons/arrow.svg";
import weakIcon from "../../assets/icons/error.svg";
import againIcon from "../../assets/icons/again.svg";
import emptyFolderIcon from "../../assets/icons/folder/empty-folder.svg";
import { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import "./index.css";
import { AppState } from "../../redux/reducers";
import { setAddFolder } from "../../redux/actions";
import { useDispatch } from "react-redux";

interface InputConfig {
  id: number;
  name: string;
  type: string;
  inputId: string;
  value: string;
  autoComplete: string;
}
interface IconConfig {
  id: number;
  img: string;
}
interface FormProps {
  inputConfigs: InputConfig[];
  setOpenPopup: any;
  setInputConfigs: any;
  modify: boolean;
  icons: IconConfig[] | undefined;
  onClick: () => void | undefined;
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({
  inputConfigs,
  setInputConfigs,
  setOpenPopup,
  modify,
  icons,
  onClick,
  onClose,
}) => {
  const dispatch = useDispatch();
  const activatedPassword = useSelector((state: AppState) => state.password);
  const btns = [
    { id: 1, name: "access", rusName: "Доступ", url: lockIcon },
    { id: 2, name: "settings", rusName: "История", url: historyIcon },
    { id: 3, name: "modify", rusName: "Изменить", url: modifyIcon },
    { id: 4, name: "link", rusName: "Ссылка", url: urlIcon },
  ];
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
  const handleChange = useCallback(
    (txt: string, id: number) => {
      setInputConfigs((prevInputs: any) =>
        prevInputs.map((input: any) =>
          input.id === id ? { ...input, value: txt } : input
        )
      );
    },
    [setInputConfigs]
  );
  const copyToClipboard = useCallback(
    (id: number) => {
      const valueToCopy =
        id === 4 && !modify && activatedPassword
          ? activatedPassword.url
          : inputConfigs.find(input => input.id === id)?.value || "";
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => openNotificationWithIcon("success", "Успешно скопировано"))
        .catch(() => openNotificationWithIcon("error", "Ошибка"));
    },
    [inputConfigs, openNotificationWithIcon, activatedPassword, modify]
  );
  const [textArea, setTextArea] = useState("");
  const maxCharacterLimit = 1200;
  const isExceedingLimit = textArea.length > maxCharacterLimit;
  const passwordRef = useRef<HTMLInputElement>(null);
  const showPassword = useCallback((e: any) => {
    e.preventDefault();
    if (passwordRef.current) {
      const inputElement = passwordRef.current;
      inputElement.type =
        inputElement.type === "password" ? "text" : "password";
    }
  }, []);
  const [chapterId, setChapterId] = useState<null | number>(null);
  const [openChapter, setOpenChapter] = useState(false);
  return (
    <form className='formContainer' onSubmit={e => e.preventDefault()}>
      {inputConfigs.map(input => (
        <div
          className={`${
            input.inputId === "chapter" && "formGroupChapter"
          } formGroup`}
          key={input.id}>
          <div className='formGroupInner'>
            <label htmlFor={input.inputId}>{input.name}:</label>
            <input
              type={input.type}
              name={input.inputId}
              value={input.value}
              autoComplete={input.autoComplete}
              ref={input.inputId === "pass" ? passwordRef : null}
              onChange={e => handleChange(e.target.value, input.id)}
              required
              aria-hidden={true}
            />
            {(!modify ||
              input.inputId === "chapter" ||
              (modify && input.inputId === "pass")) && (
              <>
                {input.inputId === "pass" && (
                  <button
                    className='eye copy'
                    onClick={e => {
                      e.preventDefault();
                      showPassword(e);
                    }}>
                    <img src={eyeIcon} alt='Eye' />
                  </button>
                )}
                <button
                  className='copy'
                  onClick={e => {
                    e.preventDefault();
                    setOpenChapter(!openChapter);
                    input.inputId !== "chapter" && copyToClipboard(input.id);
                  }}>
                  <img
                    src={
                      input.inputId === "chapter" ? emptyFolderIcon : copyIcon
                    }
                    alt='Copy'
                  />
                </button>
              </>
            )}
          </div>
          {input.inputId === "chapter" && openChapter && (
            <div className='chooseChapter'>
              <div className='heading'>
                <span>Выбрать раздел</span>
                <img src={deleteIcon} alt='Delete' />
              </div>
              <div className='content'>
                <div className='searchWrapper'>
                  <input placeholder='Поиск по названию' />
                </div>
                <div className='folders'>
                  {Array(5)
                    .fill(null)
                    .map((_, i) => {
                      return (
                        <div
                          key={i}
                          className={`${
                            i + 1 === chapterId && "active"
                          } folder`}
                          onClick={() => setChapterId(i + 1)}>
                          <img src={arrowIcon} alt='Arrow' className='arrow' />
                          <img src={emptyFolderIcon} alt='Folder' />
                          <span>Название папки</span>
                        </div>
                      );
                    })}
                  <div className='chooseBtns'>
                    <Button
                      text='Выбрать'
                      onClick={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      background='var(--main-color)'
                    />
                    <Button
                      text='Отменить'
                      onClick={() => setOpenChapter(false)}
                      background='var(--btn-secondary-color)'
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {modify && input.id === 4 && (
            <div className='complexity'>
              <label htmlFor='complecity'>Сложность:</label>
              <div className='complexityBtns'>
                <span className='weakness'>
                  <img src={weakIcon} alt='Weak' />
                  Слабый пароль
                </span>
                <button className='again'>
                  <img src={againIcon} alt='Again' />
                  Придумать пароль
                </button>
              </div>
            </div>
          )}
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
        {isExceedingLimit && (
          <span className='maxSymbolTxt'>
            Максимально колличество символов 1200
          </span>
        )}
      </div>
      {!modify && (
        <div className='formBtns'>
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
      )}
      {modify && (
        <div className='modifyContent'>
          <div className='formGroup'>
            <label htmlFor='color'>Цвет папки:</label>
            <div className='colors'>
              {Array(13)
                .fill(null)
                .map((_, i) => {
                  return (
                    <button className={`color${i + 1} color`} key={i}></button>
                  );
                })}
            </div>
          </div>
          <div className='formGroup'>
            <label htmlFor='folder'>Иконка папки:</label>
            <div className='folderIcons'>
              {icons?.map((icon, i) => {
                return (
                  <button className={`icon${i + 1} icon`} key={i}>
                    <img src={icon.img} alt='Folder' />
                  </button>
                );
              })}
            </div>
          </div>
          <div className='saveCancelWrapper'>
            <Button
              text='Сохранить'
              onClick={() => {
                onClick();
                onClose();
                dispatch(setAddFolder(false));
              }}
              background='var(--main-color)'
            />
            <Button
              text='Отменить'
              onClick={onClose}
              background='var(--btn-secondary-color)'
            />
          </div>
        </div>
      )}
      {contextHolder}
    </form>
  );
};

export default Form;
