const settings =
{
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    setSelector: '.popup__set',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
}

class FormValidator {
    constructor(setting, formElement) {
        this._formElement = formElement;
        this._formSelector = setting.formSelector;
        this._inputSelector = setting.inputSelector;
        this._submitButtonSelector = setting.submitButtonSelector;
        this._inactiveButtonClass = setting.inactiveButtonClass;
        this._inputErrorClass = setting.inputErrorClass;
        this._errorClass = setting.errorClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    }
    _disableButton() {
        this._buttonElement.disabled = 'disabled';
        this._buttonElement.classList.add(this._inactiveButtonClass);
    }

    _enableButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

    _showInputError = (inputElement, errorMessage) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };


    _hideInputError = (inputElement) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _checkInputValidity = (formElement, inputElement, setting) => {

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement, setting);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _setEventListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    };


    enableValidation() {
        this._setEventListeners();
    };
}




export { FormValidator, settings};

