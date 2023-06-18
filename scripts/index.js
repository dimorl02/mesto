import { FormValidator } from '../scripts/FormValidator.js'
import { Card } from '../scripts/Card.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { settings, initialCards } from '../scripts/constants.js';
const profile = document.querySelector('.profile');
const editPopup = document.querySelector('#popup');
const addPopup = document.querySelector('#add-popup');
const imagePopup = document.querySelector('#image-popup');
const info = profile.querySelector('.profile__info');
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

const popUps = Array.from(document.querySelectorAll('.popup'))

document.querySelectorAll('.popup__close-button').forEach(button => {
  const closeButton = button.closest('.popup');
  button.addEventListener('click', () =>
    closePopUp(closeButton));
});

const createCard = (item) => {
  const card = new Card(item, '.cards__card-template', showImagePopup);
  return card.generateCard();
};

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item), 'append');
  }
}, '.cards');

cards.renderItems();

function getForm() {
  const object = {
    name: name.value,
    link: link.value
  }
  console.log(object.name);
  return object;
}

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  briefSelector: '.profile__brief',
})

const profilePopup = new PopupWithForm('#popup', {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close()
  }
})
profilePopup.setEventListeners();

editButton.addEventListener('click', () => {
  profilePopup.open();
  profilePopup.setInputValues(userInfo.getUserInfo());
})

addForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const data = getForm();
  cards.addItem(createCard(data), 'prepend');
  addForm.reset();
  addFormValidator.disableButton();
  closePopup(addPopup);
});

addButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(addPopup);
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