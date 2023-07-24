import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import FOLDER_1 from "../../assets/icons/folder/1.svg";
import FOLDER_2 from "../../assets/icons/folder/2.svg";
import FOLDER_3 from "../../assets/icons/folder/3.svg";
import FOLDER_4 from "../../assets/icons/folder/4.svg";
import FOLDER_5 from "../../assets/icons/folder/5.svg";
import FOLDER_6 from "../../assets/icons/folder/6.svg";
import Form, { InputConfig } from "../Form";
import "./index.css";
import { AppState } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import {
  addFolder,
  addPass,
  changeFolderValue,
  changePasswordValue,
  setActivePassword,
} from "../../redux/actions";

interface ModifyContentProps {
  onClose: () => void;
  change: boolean;
}

const ModifyContent: React.FC<ModifyContentProps> = ({ onClose, change }) => {
  const activatedFolder = useSelector((state: AppState) => state.folder);
  const activatedPassword = useSelector((state: AppState) => state.password);
  const addPassState = useSelector((state: AppState) => state.addPassState);
  const dispatch = useDispatch();
  const initialInputs = useMemo(
    () => [
      {
        id: 1,
        name: "Название",
        type: "text",
        inputId: "name",
        value: activatedFolder?.name || "",
        autoComplete: "name",
      },
      {
        id: 2,
        name: "Раздел",
        type: "text",
        inputId: "chapter",
        value: "",
        autoComplete: "chapter",
      },
    ],
    [activatedFolder?.name]
  );
  const [inputConfigs, setInputConfigs] =
    useState<InputConfig[]>(initialInputs);
  useEffect(() => {
    if (activatedPassword || addPassState) {
      setInputConfigs([
        {
          id: 1,
          name: "Название",
          type: "text",
          inputId: "name",
          value: activatedPassword?.passName || "",
          autoComplete: "name",
        },
        {
          id: 2,
          name: "Логин",
          type: "email",
          inputId: "login",
          value: activatedPassword?.login || "",
          autoComplete: "username",
        },
        {
          id: 3,
          name: "Пароль",
          type: "password",
          inputId: "pass",
          value: activatedPassword?.pass || "",
          autoComplete: "current-password",
        },
        {
          id: 4,
          name: "Повторите",
          type: "password",
          inputId: "pass",
          value: activatedPassword?.pass || "",
          autoComplete: "current-password",
        },
        {
          id: 5,
          name: "URL",
          type: "text",
          inputId: "url",
          value: activatedPassword?.url || "",
          autoComplete: "url",
        },
      ]);
    } else {
      setInputConfigs(initialInputs);
    }
  }, [activatedPassword, initialInputs, addPassState, activatedFolder]);
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
  return (
    <div className='modifyContentContainer'>
      <Form
        setOpenPopup={undefined}
        onClose={onClose}
        inputConfigs={inputConfigs}
        setInputConfigs={setInputConfigs}
        modify={true}
        icons={icons}
        onClick={() => {
          const values = inputConfigs.map(item => item.value);
          if (!change) {
            if (addPassState) {
              dispatch(addPass(values));
            } else {
              dispatch(addFolder(inputConfigs[0].value));
            }
          } else {
            activatedPassword && activatedFolder
              ? dispatch(
                  changePasswordValue(
                    activatedFolder.id,
                    activatedPassword.id,
                    inputConfigs.map(input => input.value)
                  )
                )
              : dispatch(changeFolderValue(inputConfigs[0].value));
          }
          dispatch(setActivePassword(undefined));
        }}
      />
    </div>
  );
};

export default ModifyContent;
