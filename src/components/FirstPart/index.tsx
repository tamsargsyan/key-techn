import { useEffect, useState } from "react";
import { initialFolders, FolderProps } from "../../data";
import ADD_ICON from "../../assets/icons/add.svg";
import KEY_ICON from "../../assets/icons/key.svg";
import SETTINGS_ICON from "../../assets/icons/settings.svg";
import SEARCH_ICON from "../../assets/icons/search.svg";
import FOLDER_ICON from "../../assets/icons/folder.svg";
import DETAIL_ICON from "../../assets/icons/detail.svg";
import LOGO from "../../assets/logo.svg";
import DetailModal from "../DetailModal";
import "./index.css";
import { useDispatch } from "react-redux";
import { setActivedFolder } from "../../redux/actions";

const btns = [
  { id: 1, name: "Add", imgUrl: ADD_ICON },
  { id: 2, name: "Key", imgUrl: KEY_ICON },
  { id: 3, name: "Settings", imgUrl: SETTINGS_ICON },
  { id: 4, name: "Search", imgUrl: SEARCH_ICON },
];

const FirstPart = () => {
  const [folders, setFolders] = useState<FolderProps[]>(initialFolders);
  const [activeFolder, setActiveFolder] = useState(1);
  const [activeKey, setActiveKey] = useState<null | number>(null);
  const [value, setValue] = useState("");

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
  }, [value]);

  const handleKeyClick = (id: number) => {
    setActiveKey(id);
  };

  const toggleFolderOpen = (id: number) => {
    setFolders(prevFolders =>
      prevFolders.map(folder =>
        folder.id === id ? { ...folder, isOpen: !folder.isOpen } : folder
      )
    );
  };
  const dispatch = useDispatch();

  return (
    <div className='firstPartContainer'>
      <div className='header'>
        {!activeKey &&
          btns.map(({ id, name, imgUrl }) => (
            <button key={id} onClick={() => handleKeyClick(id)}>
              <img src={imgUrl} alt={name} />
            </button>
          ))}
        {activeKey === 4 && (
          <div className='searchContainer'>
            <input
              placeholder='Поиск...'
              value={value}
              onChange={e => handleChange(e.target.value)}
            />
            <img src={SEARCH_ICON} alt='Search' />
          </div>
        )}
      </div>
      <div className='content'>
        {folders.map(({ id, name }) => (
          <div
            className={`folder ${activeFolder === id && "activeFolder"}`}
            key={id}
            onClick={() => {
              setActiveFolder(id);
              dispatch(setActivedFolder(id));
            }}>
            <img src={FOLDER_ICON} alt='Folder' />
            <span>{name}</span>
            <button
              className={`${
                activeKey === 4 && activeFolder === id && "folderDetail"
              }`}
              onClick={() => toggleFolderOpen(id)}>
              <img src={DETAIL_ICON} alt='Detail' />
            </button>
            <DetailModal
              isOpen={folders.find(folder => folder.isOpen)?.id === id}
            />
          </div>
        ))}
      </div>
      <div className='copyRight'>
        <span>Разработано</span>
        <img src={LOGO} alt='Logo' />
      </div>
    </div>
  );
};

export default FirstPart;
