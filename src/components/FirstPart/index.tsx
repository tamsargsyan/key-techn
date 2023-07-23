import { useEffect, useState } from "react";
import { FolderProps } from "../../data";
import ADD_ICON from "../../assets/icons/add.svg";
import KEY_ICON from "../../assets/icons/key.svg";
import SETTINGS_ICON from "../../assets/icons/settings.svg";
import SEARCH_ICON from "../../assets/icons/search.svg";
import FOLDER_ICON from "../../assets/icons/folder.svg";
import DETAIL_ICON from "../../assets/icons/detail.svg";
import closeIcon from "../../assets/icons/close-white.png";
import LOGO from "../../assets/logo.svg";
import DetailModal from "../DetailModal";
import "./index.css";
import { useDispatch } from "react-redux";
import {
  removeFolder,
  setActivePassword,
  setActivedFolder,
  setAddFolder,
} from "../../redux/actions";
import Popup from "../Popup";
import AddFolder from "../AddFolder";
import { AppState } from "../../redux/reducers";
import { useSelector } from "react-redux";

const btns = [
  { id: 1, name: "add", rusName: "Добавить", imgUrl: ADD_ICON },
  { id: 2, name: "access", rusName: "Доступ", imgUrl: KEY_ICON },
  { id: 3, name: "settings", rusName: "Настройки", imgUrl: SETTINGS_ICON },
  { id: 4, name: "search", rusName: "Поиск", imgUrl: SEARCH_ICON },
];

const FirstPart = () => {
  const initialFolders = useSelector((state: AppState) => state.folders);
  const [folders, setFolders] = useState<FolderProps[]>(initialFolders);
  const [activeKey, setActiveKey] = useState<null | number>(null);
  const [value, setValue] = useState("");
  const [openPopup, setOpenPopup] = useState({
    open: false,
    name: "",
    rusName: "",
  });
  const dispatch = useDispatch();
  const handleChange = (txt: string) => {
    setValue(txt);
  };
  useEffect(() => {
    setFolders(
      value === ""
        ? initialFolders
        : initialFolders.filter(folder =>
            folder.name.toLowerCase().includes(value.toLowerCase())
          )
    );
  }, [value, initialFolders]);

  const toggleFolderOpen = (id: number) => {
    setFolders(prevFolders =>
      prevFolders.map(folder =>
        folder.id === id ? { ...folder, isOpen: !folder.isOpen } : folder
      )
    );
  };
  const addFolderState = useSelector((state: AppState) => state.addFolderState);
  const activeFolderId = useSelector((state: AppState) => state.folder?.id);

  return (
    <div className='firstPartContainer'>
      <div className='header'>
        {!activeKey &&
          btns.map(({ id, name, imgUrl, rusName }) => (
            <button
              key={id}
              disabled={!initialFolders.length && id > 1}
              onClick={() => {
                if (id === 1) {
                  dispatch(setAddFolder(!addFolderState));
                  dispatch(setActivePassword(undefined));
                }
                if (id > 1 && id < 4) {
                  setOpenPopup({
                    open: true,
                    name,
                    rusName,
                  });
                } else if (id === 4) setActiveKey(id);
              }}>
              <img src={imgUrl} alt={rusName} />
            </button>
          ))}
        {activeKey === 4 && (
          <div className='searchContainer'>
            <input
              placeholder='Поиск...'
              value={value}
              onChange={e => handleChange(e.target.value)}
            />
            <button
              className='searchCloseBtn'
              onClick={() => {
                setActiveKey(null);
                handleChange("");
              }}>
              <img src={closeIcon} alt='Close' />
            </button>
            <img src={SEARCH_ICON} alt='Search' />
          </div>
        )}
      </div>
      <div className='content'>
        {folders.length && !addFolderState ? (
          folders.map(({ id, name }) => (
            <div
              className={`folder ${activeFolderId === id && "active"}`}
              key={id}
              onClick={() => {
                dispatch(setActivedFolder(id));
                dispatch(setActivePassword(undefined));
              }}>
              <img src={FOLDER_ICON} alt='Folder' />
              <span>{name}</span>
              <button
                className={`${activeFolderId === id && "detailModal"}`}
                onClick={() => toggleFolderOpen(id)}>
                <img src={DETAIL_ICON} alt='Detail' />
              </button>
              <DetailModal
                className='folderDetails'
                remove={() => dispatch(removeFolder(id))}
                isOpen={folders.find(folder => folder.isOpen)?.id === id}
              />
            </div>
          ))
        ) : (
          <AddFolder
            text='Добавить папку'
            onClick={() => {
              setOpenPopup({
                open: true,
                name: "modify",
                rusName: "create folder",
              });
              // dispatch(setActivedFolder(undefined));
            }}
          />
        )}
      </div>
      <div className='copyRight'>
        <span>Разработано</span>
        <img src={LOGO} alt='Logo' />
      </div>
      {openPopup.open && (
        <Popup
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

export default FirstPart;
