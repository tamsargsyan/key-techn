import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../Popup";
import "./index.css";
import Form from "../Form";
import { initialFolders } from "../../data/index";
import { AppState } from "../../redux/reducers";

interface OpenPopupState {
  open: boolean;
  name: string;
  rusName: string;
}

const ThirdPart = () => {
  const activatedFolderName = useSelector(
    (state: AppState) => state.folder?.name
  );
  const activatedPassword = useSelector((state: AppState) => state.password);
  const addFolderState = useSelector((state: AppState) => state.addFolderState);
  const [openPopup, setOpenPopup] = useState<OpenPopupState>({
    open: false,
    name: "",
    rusName: "",
  });
  const initialInputs = useMemo(
    () => [
      {
        id: 1,
        name: "Название",
        type: "text",
        inputId: "name",
        value: activatedFolderName,
        autoComplete: "name",
      },
    ],
    [activatedFolderName]
  );
  const [inputConfigs, setInputConfigs] = useState(initialInputs);
  useEffect(() => {
    if (activatedPassword) {
      setInputConfigs([
        {
          id: 1,
          name: "Логин",
          type: "email",
          inputId: "login",
          value: activatedPassword.login,
          autoComplete: "username",
        },
        {
          id: 2,
          name: "Пароль",
          type: "password",
          inputId: "pass",
          value: activatedPassword.pass,
          autoComplete: "current-password",
        },
        {
          id: 3,
          name: "URL",
          type: "text",
          inputId: "url",
          value: activatedPassword.url,
          autoComplete: "url",
        },
      ]);
    } else {
      setInputConfigs(initialInputs);
    }
  }, [activatedPassword, activatedFolderName?.url, initialInputs]);
  return (
    <div className='thirdPartContainer'>
      <div className='heading'>
        {!activatedPassword ? activatedFolderName : activatedPassword?.url}
      </div>
      {initialFolders.length && !addFolderState ? (
        <div className='content'>
          <Form
            setOpenPopup={setOpenPopup}
            inputConfigs={inputConfigs}
            setInputConfigs={setInputConfigs}
            modify={false}
            icons={undefined}
            onClick={function (): void | undefined {
              throw new Error("Function not implemented.");
            }}
            onClose={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      ) : (
        <div className='noItem'>Тут пока ничего нет...</div>
      )}
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
          header={`${openPopup.rusName} 
            ${
              (openPopup.name === "modify" &&
                (activatedPassword ? "пароль" : "папку")) ||
              ""
            }
          `}
          content={openPopup.name}
        />
      )}
    </div>
  );
};

export default ThirdPart;
