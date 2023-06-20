import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { settings, initialCards } from '../utils/constants.js';
import {
  editForm,
  addForm,
  name,
  link,
  addButton,
  editButton
} 
from '../utils/constants.js';

import '../pages/index.css';
/*основная функциональность*/

const createCard = (item) => {
  const card = new Card({
    card: item,
    templateSelector: '.cards__card-template',
    showImagePopup: () => {
      cardImagePopup.open(card.getImageData());
    }
  })
  return card.generateCard();
};

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item), 'append');
  }
}, '.cards');

cards.renderItems();

const editProfilePopup = new PopupWithForm('#popup', {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close()
  }
})

function getForm() {
  const object = {
    name: name.value,
    link: link.value
  }
  return object;
}

/* создание классов и слушателей для них*/
const cardImagePopup = new PopupWithImage('#image-popup');
cardImagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  briefSelector: '.profile__brief',
})

const addCardPopup = new PopupWithForm('#add-popup', {
  submitCallback: () => {
    const data = getForm();
    cards.addItem(createCard(data), 'prepend');
    addForm.reset();
    addFormValidator.disableButton();
    addCardPopup.close();
  }
})

/*слушатели*/
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

addButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addCardPopup.open();
});

editButton.addEventListener('click', () => {
  editProfilePopup.setInputValues(userInfo.getUserInfo());
  editProfilePopup.open();
})

/*валидация*/
const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();