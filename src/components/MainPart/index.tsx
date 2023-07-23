import STAR_ICON from "../../assets/icons/star.svg";
import STAR_TRANSPARENT_ICON from "../../assets/icons/star-transparent.svg";
import DETAILS_ICON from "../../assets/icons/detail.svg";
import GALLERY_ICON from "../../assets/icons/gallery.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setActivePassword } from "../../redux/actions";
import { ArrowDownOutlined } from "@ant-design/icons";
import AddFolder from "../AddFolder";
import { AppState } from "../../redux/reducers";
import Popup from "../Popup";

const MainPart = () => {
  const activatedFolder = useSelector((state: AppState) => state.folder);
  const [sortAscending, setSortAscending] = useState(true);
  const dispatch = useDispatch();
  const sortedList =
    activatedFolder &&
    [...activatedFolder.passwords].sort((a, b) =>
      sortAscending
        ? a.passName.localeCompare(b.passName)
        : b.passName.localeCompare(a.passName)
    );
  const handleSortClick = () => {
    setSortAscending(!sortAscending);
  };
  const activatedPassword = useSelector((state: AppState) => state.password);
  const addFolderState = useSelector((state: AppState) => state.addFolderState);
  const [openPopup, setOpenPopup] = useState({
    open: false,
    name: "",
    rusName: "",
  });
  console.log(activatedFolder);
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
          sortedList.map((pass: any) => {
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
                  <img src={DETAILS_ICON} alt='Details' />
                  <img src={STAR_TRANSPARENT_ICON} alt='Star' />
                </div>
              </div>
            );
          })
        ) : (
          <AddFolder
            text='Добавить пароль'
            onClick={() => {
              setOpenPopup({
                open: true,
                name: "modify",
                rusName: "create password",
              });
            }}
          />
        )}
      </div>
      {openPopup.open && (
        <Popup
          modify={false}
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

export default MainPart;
