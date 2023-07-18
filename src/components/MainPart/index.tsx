import STAR_ICON from "../../assets/icons/star.svg";
import STAR_TRANSPARENT_ICON from "../../assets/icons/star-transparent.svg";
import DETAILS_ICON from "../../assets/icons/detail.svg";
import GALLERY_ICON from "../../assets/icons/gallery.svg";
import "./index.css";

const MainPart = () => {
  return (
    <div className='mainPartContainer'>
      <div className='heading'>
        <div className='sortingHeader'>Название ↓</div>
        <div className='url'>URL</div>
        <div className='star'>
          <img src={STAR_ICON} alt='Star' />
        </div>
      </div>
      <div className='content'>
        <div className='folder'>
          <div className='name'>
            <img src={GALLERY_ICON} alt='Gallery' />
            <span>Название пароля</span>
          </div>
          <div className='url'>
            <span>https://www.site.com</span>
          </div>
          <div className='star'>
            <img src={DETAILS_ICON} alt='Details' />
            <img src={STAR_TRANSPARENT_ICON} alt='Star' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPart;
