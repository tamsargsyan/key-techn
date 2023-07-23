import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import FOLDER_1 from "../../assets/icons/folder/1.svg";
import FOLDER_2 from "../../assets/icons/folder/2.svg";
import FOLDER_3 from "../../assets/icons/folder/3.svg";
import FOLDER_4 from "../../assets/icons/folder/4.svg";
import FOLDER_5 from "../../assets/icons/folder/5.svg";
import FOLDER_6 from "../../assets/icons/folder/6.svg";
import Form from "../Form";
import "./index.css";
import { AppState } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import { addFolder } from "../../redux/actions";

interface ModifyContentProps {
  onClose: () => void;
}

const ModifyContent: React.FC<ModifyContentProps> = ({ onClose }) => {
  const activatedFolder = useSelector((state: AppState) => state.folder);
  const activatedPassword = useSelector((state: AppState) => state.password);
  const addFolderState = useSelector((state: AppState) => state.addFolderState);
  const initialInputs = useMemo(
    () => [
      {
        id: 1,
        name: "Название",
        type: "text",
        inputId: "name",
        value:
          addFolderState && activatedFolder.name ? "" : activatedFolder.name,
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
    [activatedFolder.name, addFolderState]
  );
  const [inputConfigs, setInputConfigs] = useState(initialInputs);
  useEffect(() => {
    if (activatedPassword || !activatedFolder.passwords.length) {
      setInputConfigs([
        {
          id: 1,
          name: "Название",
          type: "text",
          inputId: "name",
          value:
            addFolderState || !activatedFolder.passwords.length
              ? ""
              : activatedFolder.name || "",
          autoComplete: "name",
        },
        {
          id: 2,
          name: "Логин",
          type: "email",
          inputId: "login",
          value:
            addFolderState || !activatedFolder.passwords.length
              ? ""
              : activatedPassword?.login || "",
          autoComplete: "username",
        },
        {
          id: 3,
          name: "Пароль",
          type: "text",
          inputId: "pass",
          value:
            addFolderState || !activatedFolder.passwords.length
              ? ""
              : activatedPassword?.pass || "",
          autoComplete: "current-password",
        },
        {
          id: 4,
          name: "Повторите",
          type: "text",
          inputId: "pass",
          value:
            addFolderState || !activatedFolder.passwords.length
              ? ""
              : activatedPassword?.pass || "",
          autoComplete: "current-password",
        },
        {
          id: 5,
          name: "URL",
          type: "text",
          inputId: "url",
          value:
            addFolderState || !activatedFolder.passwords.length
              ? ""
              : activatedPassword?.url || "",
          autoComplete: "url",
        },
      ]);
    } else {
      setInputConfigs(initialInputs);
    }
  }, [
    activatedPassword,
    activatedFolder.name,
    initialInputs,
    addFolderState,
    activatedFolder.passwords.length,
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
  const dispatch = useDispatch();

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
          dispatch(addFolder(inputConfigs[0].value));
        }}
      />
    </div>
  );
};

export default ModifyContent;
