import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._submitForm = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._submitForm.querySelectorAll('.popup__text'));
      this._submitButton = this._submitForm.querySelector('.popup__save-button');
    }
  
    _getInputValues() {
      this._inputValues = {};
      this._inputList.forEach((input) => {
        this._inputValues[input.name] = input.value;
      });
      return this._inputValues;
    }
  
    setInputValues = (data) => {
      this._inputList.forEach((input) => {
        input.value = data[input.name];
      });
    }

    renderPreloader(loading, displayText) {
      if (!this._submitButton) return;
      if (loading) {
        this.defaultText = this._submitButton.textContent;
        this._submitButton.textContent = displayText;
      } else {
        this._submitButton.textContent = this.defaultText;
      }
    }
    

    close() {
      this._submitForm.reset();
      super.close();
    }

    setEventListeners() {
      super.setEventListeners();
      this._submitForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      })
    }
  };
  
