import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._formSubmit = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._formSubmit.querySelectorAll('.popup__text'));
      this._buttonSubmit = this._formSubmit.querySelector('.popup__button-submit');
    }
  
    _getInputValues() {
      this._inputValues = {};
      this._inputList.forEach((input) => {
        this._inputValues[input.name] = input.value;
      });
      return this._inputValues;
    }
  
    setInputValues = (data) => {
      this._inputList.forEach((input, i) => {
        input.value = Object.values(data)[i];
      });
    }

    close() {
      super.close();
    }

    setEventListeners() {
      super.setEventListeners();
      this._formSubmit.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.close();
        this._submitCallback(this._getInputValues());
      })
    }
  };
  
