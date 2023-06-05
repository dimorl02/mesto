import {FormValidator, settings} from './FormValidator.js'
import {Card} from '../scripts/Card.js';
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
export {addForm, editForm}
const popupName = editPopup.querySelector('#user');
const popupBrief = editPopup.querySelector('#brief');

const nm = imagePopup.querySelector('#image-popup__name');
const img = imagePopup.querySelector('#image-popup__image');
const name = addPopup.querySelector('#name');
const link = addPopup.querySelector('#link');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


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
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
function closePopupOverlay(evt) {
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

function showPopup(element) {
  nm.textContent = element.name;
  img.src = element.link;
  img.alt = element.name;
  openPopup(imagePopup);
}




const createCard = (item) => {
  const card = new Card(item.name, item.link, showPopup);
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
  console.log()
  openPopup(editPopup);
});

document.querySelectorAll('.popup__close-button').forEach(closeButton => {
  const activePopup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () =>
      closePopup(activePopup));
});

/*обработчики для отправки данных*/
editForm.addEventListener('submit', editProfile);

console.log(addForm);
const addFormValidated = new FormValidator(settings, addForm);
const editFormValidated = new FormValidator(settings, editForm);
addFormValidated.enableValidation();
editFormValidated.enableValidation();