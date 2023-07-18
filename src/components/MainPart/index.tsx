import STAR_ICON from "../../assets/icons/star.svg";
import STAR_TRANSPARENT_ICON from "../../assets/icons/star-transparent.svg";
import DETAILS_ICON from "../../assets/icons/detail.svg";
import GALLERY_ICON from "../../assets/icons/gallery.svg";
import "./index.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const MainPart = () => {
  const activatedFolder = useSelector((state: any) => state.folder);
  const [sortAscending, setSortAscending] = useState(true);

  const sortedList = [...activatedFolder.passwords].sort((a, b) =>
    sortAscending
      ? a.passName.localeCompare(b.passName)
      : b.passName.localeCompare(a.passName)
  );
  const handleSortClick = () => {
    setSortAscending(!sortAscending);
  };
  return (
    <div className='mainPartContainer'>
      <div className='heading' onClick={handleSortClick}>
        <div className='sortingHeader'>Название ↓</div>
        <div className='url'>URL</div>
        <div className='star'>
          <img src={STAR_ICON} alt='Star' />
        </div>
      </div>
      <div className='content'>
        {sortedList.map((pass: any) => {
          return (
            <div className='folder'>
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
        })}
      </div>
    </div>
  );
};

export default MainPart;
