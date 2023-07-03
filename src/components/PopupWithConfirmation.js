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

  renderPreloader(loading, displayText) {
    if (!this._confirmButton) return;
    if (loading) {
      this.defaultText = this._confirmButton.textContent;
      this._confirmButton.textContent = displayText;
    } else {
      this._confirmButton.textContent = this.defaultText;
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._submitCallback(this.id, this.card);
    })
  }

};