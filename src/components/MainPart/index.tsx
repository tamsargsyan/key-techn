import STAR_ICON from "../../assets/icons/star.svg";
import STAR_TRANSPARENT_ICON from "../../assets/icons/star-transparent.svg";
import DETAILS_ICON from "../../assets/icons/detail.svg";
import GALLERY_ICON from "../../assets/icons/gallery.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removePass, setActivePassword, setAddPass } from "../../redux/actions";
import { ArrowDownOutlined } from "@ant-design/icons";
import AddFolder from "../AddFolder";
import { AppState } from "../../redux/reducers";
import Popup from "../Popup";
import { PasswordProps } from "../../data";
import DetailModal from "../DetailModal";

const MainPart = () => {
  const activatedPassword = useSelector((state: AppState) => state.password);
  const activedFolder = useSelector((state: AppState) => state.folder);
  const addFolderState = useSelector((state: AppState) => state.addFolderState);
  const [sortAscending, setSortAscending] = useState(true);
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState<null | PasswordProps[]>(null);
  useEffect(() => {
    activedFolder?.passwords && setPasswords(activedFolder.passwords);
  }, [activedFolder?.passwords]);
  const sortedList =
    passwords &&
    [...passwords].sort((a, b) =>
      sortAscending
        ? a.passName.localeCompare(b.passName)
        : b.passName.localeCompare(a.passName)
    );
  const [openPopup, setOpenPopup] = useState({
    open: false,
    name: "",
    rusName: "",
  });
  const togglePassOpen = (id: number) => {
    setPasswords(
      prevPass =>
        prevPass &&
        prevPass.map(pass =>
          pass.id === id ? { ...pass, isOpen: !pass.isOpen } : pass
        )
    );
  };
  const handleSortClick = () => {
    setSortAscending(!sortAscending);
  };
  const folders = useSelector((state: AppState) => state.folders);
  return (
    <div className='mainPartContainer'>
      <div className='heading' onClick={handleSortClick}>
        <div
          className={`${!sortAscending && "sortingHeaderTrue"} sortingHeader`}>
          Название <ArrowDownOutlined />
        </div>
        <div className='url'>URL</div>
        <div className='star'>
          <img src={STAR_ICON} alt='Star' />
        </div>
      </div>
      <div className='content'>
        {sortedList?.length && !addFolderState ? (
          sortedList.map((pass: PasswordProps) => {
            return (
              <div
                className={`${
                  activatedPassword?.id === pass.id && "active"
                } folder pass`}
                key={pass.id}
                onClick={() => dispatch(setActivePassword(pass.id))}>
                <div className='name'>
                  <img src={GALLERY_ICON} alt='Gallery' />
                  <span>{pass.passName}</span>
                </div>
                <div className='url'>
                  <span>{pass.url}</span>
                </div>
                <div className='star'>
                  <button
                    className={`${
                      activatedPassword?.id === pass.id && "detailModal"
                    }`}
                    onClick={() => togglePassOpen(pass.id)}>
                    <img src={DETAILS_ICON} alt='Details' />
                  </button>
                  <img src={STAR_TRANSPARENT_ICON} alt='Star' />
                </div>
                <DetailModal
                  item='пароль'
                  className='passwordDetails'
                  remove={() => {
                    dispatch(removePass(pass.id));
                    dispatch(setActivePassword(undefined));
                  }}
                  isOpen={passwords?.find(pass => pass.isOpen)?.id === pass.id}
                />
              </div>
            );
          })
        ) : (
          <AddFolder
            text='Добавить пароль'
            disabled={!folders.length}
            onClick={() => {
              setOpenPopup({
                open: true,
                name: "modify",
                rusName: "Создать пароль",
              });
              dispatch(setAddPass(true));
            }}
          />
        )}
      </div>
      {openPopup.open && (
        <Popup
          onClose={() => {
            setOpenPopup({
              open: false,
              name: "",
              rusName: "",
            });
            dispatch(setAddPass(false));
          }}
          header={openPopup.rusName}
          content={openPopup.name}
        />
      )}
    </div>
  );
};

export default MainPart;
