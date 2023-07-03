import Popup from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  open(cardElement, cardId) {
    super.open();
    this.id = cardId;
    this.card = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._submitCallback(this.id, this.card);
    })
  }

};