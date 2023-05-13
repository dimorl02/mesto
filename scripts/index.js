const profile = document.querySelector('.profile');
const editpopup = document.querySelector('#popup');
const addpopup = document.querySelector('#add-popup');
const imagepopup = document.querySelector('#image-popup');
const info = profile.querySelector('.profile__info');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__card-template').content;

const form = editpopup.querySelector('#popup__form');
const addform = addpopup.querySelector('#add-popup__form');
const author = info.querySelector('.profile__author');
const textname = author.querySelector('.profile__name');
const textbrief = author.querySelector('.profile__brief');
const cardname = addpopup.querySelector('#name');
const cardimage = addpopup.querySelector('#link');

const popupname = editpopup.querySelector('#user');
const popupbrief = editpopup.querySelector('#brief');

const img = imagepopup.querySelector('#image-popup__image');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = editpopup.querySelector('.popup__close-button');
const secondcloseButton = addpopup.querySelector('#add-popup__close-button');
const createButton = addpopup.querySelector('#add-popup__create-button');




/*открытие-закрытие попапов*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  popup.addEventListener("click", closePopupOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  popup.removeEventListener("click", closePopupOverlay);
}

/*закрытие попапов (улучшение UX)*/
function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupopened = document.querySelector('.popup_opened');
    closePopup(popupopened);
  }
}

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    const popupopened = document.querySelector('.popup_opened');
    closePopup(popupopened);
  }
}


/*валидация*/

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error_active');
};


const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text-error_active');
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add('popup__save-button_disabled');
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove('popup__save-button_disabled');
  buttonElement.removeAttribute('disabled', true);
} 
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__save-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
  fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
});   
    
  });
};

enableValidation();

/*основная функциональность*/
function editProfile(evt) {
  evt.preventDefault();
  textname.textContent = popupname.value;
  textbrief.textContent = popupbrief.value;
  closePopup(editpopup);
}

function addCard(evt) {
  evt.preventDefault();
  renderCards(cardname.value, cardimage.value);
  closePopup(addpopup);
}


function returnCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);

  cardElement.querySelector('.cards__name').textContent = name;
  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__image').alt = name;
  return cardElement;
}


function createCard(name, link) {
  const cardElement = returnCard(name, link);

  cardElement.querySelector('.cards__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('cards__like-button_active');
  });

  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    imagepopup.querySelector('#image-popup__name').textContent = name;
    img.src = link;
    img.alt = name;
    openPopup(imagepopup);
  });
  return cardElement;
}


const renderCards = (name, link) => {
  cardsList.prepend(createCard(name, link));
}

const firstcards = initialCards.map(({ name, link }) => createCard(name, link));
cardsList.prepend(...firstcards);

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();
  renderCards(inputPlaceName.value, inputLink.value);
  closePopup(popupAdd);
  evt.target.reset();
}


profile.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupname.value = textname.textContent;
  popupbrief.value = textbrief.textContent;
  openPopup(editpopup);
});
popup.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(editpopup);
});

profile.querySelector('.profile__add-button').addEventListener('click', () => {
  openPopup(addpopup);
});
addpopup.querySelector('#add-popup__close-button').addEventListener('click', () => {
  closePopup(addpopup);
});

imagepopup.querySelector('#image-popup__close-button').addEventListener('click', () => {
  closePopup(imagepopup);
});


/*обработчики для отправки данных*/
form.addEventListener('submit', editProfile);
addform.addEventListener('submit', addCard);

