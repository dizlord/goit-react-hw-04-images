import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, openModal }) => {
  return (
    <li className="ImageGalleryItem ">
      <img src={webformatURL} alt="" className='ImageGalleryItem-image' onClick={() => openModal(largeImageURL)} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;