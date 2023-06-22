import Popup from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__image');
    this._cardName = this._popup.querySelector('.popup__name');
  }

  open(item) {
    super.open();
    this._cardImage.src = item.link;
    this._cardImage.alt = item.name;
    this._cardName.textContent = item.name;
  }

  setEventListeners() {
    super.setEventListeners();
  }
};
