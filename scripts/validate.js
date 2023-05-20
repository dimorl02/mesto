/*валидация*/
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

function disableButton(buttonElement, setting) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(setting.inactiveButtonClass);
}
  
function enableButton(buttonElement, setting) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(setting.inactiveButtonClass);
}

const showInputError = (formElement, inputElement, errorMessage, setting) => {
    console.log(setting.formSelector);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    console.log(setting);
    inputElement.classList.add(setting.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setting.errorClass);
  };
  
  
  const hideInputError = (formElement, inputElement, setting) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setting.inputErrorClass);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = '';
  };
  
  
  const checkInputValidity = (formElement, inputElement, setting) => {
    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, setting);
    } else {
      hideInputError(formElement, inputElement, setting);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  const toggleButtonState = (inputList, buttonElement, setting) => {
    if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, setting);
  } else {
    enableButton(buttonElement, setting);
  } 
  }
  
  const setEventListeners = (formElement, setting) => {
    const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
    const buttonElement = formElement.querySelector(setting.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, setting);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, setting);
        toggleButtonState(inputList, buttonElement, setting);
      });
    });
  };
  
  
  const enableValidation = (setting) => {
    const formList = Array.from(document.querySelectorAll(setting.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement, setting);
    });   
    
    };

  
enableValidation(settings);
