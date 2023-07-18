import EYE_ICON from "../../assets/icons/eye.svg";
import COPY_ICON from "../../assets/icons/copy.svg";
import LOCK_ICON from "../../assets/icons/lock.svg";
import HISTORY_ICON from "../../assets/icons/history.svg";
import MODIFY_ICON from "../../assets/icons/modify.svg";
import URL_ICON from "../../assets/icons/url.svg";
import "./index.css";
import { useRef, useState } from "react";

const ThirdPart = () => {
  const btns = [
    {
      id: 1,
      name: "Доступ",
      url: LOCK_ICON,
    },
    {
      id: 2,
      name: "История",
      url: HISTORY_ICON,
    },
    {
      id: 3,
      name: "Изменить",
      url: MODIFY_ICON,
    },
    {
      id: 4,
      name: "Ссылка",
      url: URL_ICON,
    },
  ];

  const [inputs, setInputs] = useState([
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
  ]);

  const handleChange = (txt: string, inputId: string) => {
    const updatedInputs = inputs.map(input => {
      if (input.inputId === inputId) {
        return {
          ...input,
          value: txt,
        };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const copyToClipboard = (id: number) => {
    const valueToCopy = inputs.find(input => input.id === id)?.value || "";
    navigator.clipboard
      .writeText(valueToCopy)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch(error => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const passwordRef = useRef<HTMLInputElement>(null);

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (passwordRef.current) {
      const inputElement = passwordRef.current;
      inputElement.type =
        inputElement.type === "password" ? "text" : "password";
    }
  };

  return (
    <div className='thidPartContainer'>
      <div className='heading'>3nv.ru</div>
      <div className='content'>
        <form>
          {inputs.map(input => {
            return (
              <div className='formGroup' key={input.inputId}>
                <label htmlFor={input.inputId}>{input.name}</label>
                <input
                  type={input.type}
                  id={input.inputId}
                  name={input.inputId}
                  value={input.value}
                  autoComplete='current-password'
                  ref={input.id === 2 ? passwordRef : undefined}
                  onChange={e => handleChange(e.target.value, input.inputId)}
                  required
                />
                {input.id === 2 ? (
                  <button className='eye copy' onClick={showPassword}>
                    <img src={EYE_ICON} alt='Eye' />
                  </button>
                ) : null}
                <button
                  className='copy'
                  onClick={e => {
                    e.preventDefault();
                    copyToClipboard(input.id);
                  }}>
                  <img src={COPY_ICON} alt='Copy' />
                </button>
              </div>
            );
          })}
          <div className='formGroup textArea'>
            <label htmlFor='message'>Комментарий:</label>
            <textarea id='message' name='message' rows={4} required></textarea>
          </div>
          <div className='formBtns'>
            {btns.map(btn => {
              return (
                <button className='formBtn' key={btn.id}>
                  <img src={btn.url} alt={btn.name} />
                  {btn.name}
                </button>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThirdPart;
