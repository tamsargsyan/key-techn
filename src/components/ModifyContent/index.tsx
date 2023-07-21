import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import FOLDER_1 from "../../assets/icons/folder/1.svg";
import FOLDER_2 from "../../assets/icons/folder/2.svg";
import FOLDER_3 from "../../assets/icons/folder/3.svg";
import FOLDER_4 from "../../assets/icons/folder/4.svg";
import FOLDER_5 from "../../assets/icons/folder/5.svg";
import FOLDER_6 from "../../assets/icons/folder/6.svg";
import "./index.css";
import Button from "../Button";

const ModifyContent = () => {
  const activatedFolderName = useSelector((state: any) => state.folder?.name);
  const activatedPassword = useSelector((state: any) => state.password);

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "Название",
      type: "text",
      inputId: "text",
      value: "",
    },
    {
      id: 2,
      name: "Раздел",
      type: "text",
      inputId: "text",
      value: "",
    },
    // {
    //   id: 3,
    //   name: "URL",
    //   type: "text",
    //   inputId: "url",
    //   value: "",
    // },
  ]);
  const icons = [
    {
      id: 1,
      img: FOLDER_1,
    },
    {
      id: 2,
      img: FOLDER_2,
    },
    {
      id: 3,
      img: FOLDER_3,
    },
    {
      id: 4,
      img: FOLDER_4,
    },
    {
      id: 5,
      img: FOLDER_5,
    },
    {
      id: 6,
      img: FOLDER_6,
    },
  ];
  const handleChange = useCallback((txt: string, inputId: string) => {
    setInputs(prevInputs =>
      prevInputs.map(input =>
        input.inputId === inputId ? { ...input, value: txt } : input
      )
    );
  }, []);
  return (
    <div className='modifyContentContainer'>
      <form>
        {inputs.map(input => (
          <div className='formGroup' key={input.id}>
            <label htmlFor={input.inputId}>{input.name}:</label>
            <input
              type={input.type}
              id={input.inputId}
              name={input.inputId}
              value={input.value}
              autoComplete={input.id === 2 ? "current-password" : undefined}
              // ref={input.id === 2 ? passwordRef : null}
              onChange={e => handleChange(e.target.value, input.inputId)}
              required
            />
          </div>
        ))}
        <div className='formGroup textArea'>
          <label htmlFor='message'>
            {!activatedPassword ? "Описание" : "Комментарий"}:
          </label>
          <textarea rows={4} cols={80} />
        </div>
        <div className='formGroup'>
          <label htmlFor='color'>Цвет папки:</label>
          <div className='colors'>
            {Array(13)
              .fill(null)
              .map((_, i) => {
                return <div className={`color${i + 1} color`} key={i}></div>;
              })}
          </div>
        </div>
        <div className='formGroup'>
          <label htmlFor='folder'>Иконка папки:</label>
          <div className='folderIcons'>
            {icons.map((icon, i) => {
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
            onClick={() => {}}
            background='var(--main-color)'
          />
          <Button
            text='Отменить'
            onClick={() => {}}
            background='var(--btn-secondary-color)'
          />
        </div>
      </form>
    </div>
  );
};

export default ModifyContent;
