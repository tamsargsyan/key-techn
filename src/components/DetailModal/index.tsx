import { useDispatch } from "react-redux";
import {
  setActivePassword,
  setActivedFolder,
  setAddFolder,
} from "../../redux/actions";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";
import "./index.css";

interface DetailProps {
  name: string;
  id: number;
}

interface DetailModalProps {
  isOpen: boolean;
  remove: () => void;
  className: string;
  item: string;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  remove,
  className,
  item,
}) => {
  const details = [
    {
      id: 1,
      name: `Удалить ${item}`,
    },
    {
      id: 2,
      name: "Добавить подраздел",
    },
    {
      id: 3,
      name: "Добавить пароль",
    },
    {
      id: 4,
      name: "Добавить в избранное",
    },
  ];

  const dispatch = useDispatch();
  const folders = useSelector((state: AppState) => state.folders);
  const activatedFolder = useSelector((state: AppState) => state.folder);
  const activatedPassword = useSelector((state: AppState) => state.password);
  const activatedFolderIndex = folders.findIndex(
    folder => folder.id === activatedFolder?.id
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${className} detailModalContainer`}>
      <div className='embed'></div>
      {details.map(({ id, name }: DetailProps, i) => {
        return (
          <button
            key={id + i}
            className='detail'
            onClick={e => {
              e.stopPropagation();
              if (id === 1) {
                remove();
                if (!activatedPassword) {
                  const folderToActivate =
                    folders[activatedFolderIndex + 1] ||
                    folders[activatedFolderIndex - 1];
                  if (folderToActivate) {
                    dispatch(setActivedFolder(folderToActivate.id));
                  } else {
                    dispatch(setAddFolder(true));
                    dispatch(setActivedFolder(undefined));
                  }
                } else {
                  dispatch(setActivePassword(undefined));
                }
              }
            }}>
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default DetailModal;
