import Popup from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._formSubmit = this._popup.querySelector('.popup__form');
      this._inputList = Array.from(this._formSubmit.querySelectorAll('.popup__text'));
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

    close() {
      this._formSubmit.reset();
      super.close();
    }

    setEventListeners() {
      super.setEventListeners();
      this._formSubmit.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      })
    }
  };
  
