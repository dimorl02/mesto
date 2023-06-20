import Popup from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__image');
    this._cardName = this._popup.querySelector('.popup__name');
  }

  open(img) {
    super.open();
    this._cardImage.src = img.src;
    this._cardImage.alt = img.alt;
    this._cardName.textContent = img.alt
  }

  setEventListeners() {
    super.setEventListeners();
  }
};
