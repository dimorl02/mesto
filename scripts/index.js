import {FormValidator} from '../scripts/FormValidator.js'
import {Card} from '../scripts/Card.js';
import {settings, initialCards} from '../scripts/constants.js';
const profile = document.querySelector('.profile');
const editPopup = document.querySelector('#popup');
const addPopup = document.querySelector('#add-popup');
const imagePopup = document.querySelector('#image-popup');
const info = profile.querySelector('.profile__info');
const cardsList = document.querySelector('.cards');
const editForm = editPopup.querySelector('#popup__form');
const addForm = addPopup.querySelector('#add-popup__form');
const author = info.querySelector('.profile__author');
const textName = author.querySelector('.profile__name');
const textBrief = author.querySelector('.profile__brief');
const popupName = editPopup.querySelector('#user');
const popupBrief = editPopup.querySelector('#brief');
const cardName = imagePopup.querySelector('#image-popup__name');
const cardImage = imagePopup.querySelector('#image-popup__image');
const name = addPopup.querySelector('#name');
const link = addPopup.querySelector('#link');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const createButton = addPopup.querySelector('add-popup__create-button');


/*открытие-закрытие попапов*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener("click", closePopupByOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener("click", closePopupByOverlay);
}

/*закрытие попапов (улучшение UX)*/
function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}


/*основная функциональность*/
function editProfile(evt) {
  evt.preventDefault();
  textName.textContent = popupName.value;
  textBrief.textContent = popupBrief.value;
  closePopup(editPopup);
}

function showImagePopup(cardData) {
  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  openPopup(imagePopup);
}




const createCard = (item) => {
  const card = new Card(item, '.cards__card-template', showImagePopup);
  return card.generateCard();
};

const renderCard = (item, state) => {
  switch (state) {
      case 'prepend': cardsList.prepend(createCard(item)); break;
      case 'append': cardsList.append(createCard(item)); break;
      default: cardsList.prepend(createCard(item));
  }
}

initialCards.forEach((item) => renderCard(item, 'append'));

function getForm() {
  const object = {
    name: name.value,
    link: link.value
  }
  console.log(object.name);
  return object;
}

addForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const data = getForm();
  renderCard(data, 'prepend');
  addForm.reset();
  addFormValidator.disableButton();
  closePopup(addPopup);
});

addButton.addEventListener('click', function (e) {
  e.preventDefault();
  openPopup(addPopup);
});

editButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupBrief.value = textBrief.textContent;
  popupName.value = textName.textContent;
  openPopup(editPopup);
});


/*закрытие попапов*/
document.querySelectorAll('.popup__close-button').forEach(closeButton => {
  const activePopup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () =>
      closePopup(activePopup));
});

/*обработчики для отправки данных*/
editForm.addEventListener('submit', editProfile);


/*валидация*/
const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();