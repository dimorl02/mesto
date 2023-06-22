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
  addButton,
  editButton
}
  from '../utils/constants.js';
import '../pages/index.css';


/*основная функциональность*/
const createCard = (item) => {
  const card = new Card(item, '.cards__card-template', () => {
    cardImagePopup.open(item);
  });
  return card.generateCard();
};

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item), 'append');
  }
}, '.cards');

cards.renderItems();

/* создание классов*/
const editProfilePopup = new PopupWithForm('#popup', {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
    editFormValidator.disableButton();
    editProfilePopup.close();
  }
})

const cardImagePopup = new PopupWithImage('#image-popup');
cardImagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  briefSelector: '.profile__brief',
})

const addCardPopup = new PopupWithForm('#add-popup', {
  submitCallback: (item) => {
    cards.addItem(createCard(item))
    addFormValidator.disableButton();
    addCardPopup.close();
    console.log(item);
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