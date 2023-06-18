import Popup from '../scripts/Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__image');
    this._cardName = this._popup.querySelector('.popup__name');
  }

  open(img) {
    super.open();
    this._cardImage.src = img.link;
    this._cardImage.alt = img.name;
    this._cardName.textContent = img.name
  }

};
