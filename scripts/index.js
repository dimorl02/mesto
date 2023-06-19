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
const editForm = editPopup.querySelector('#popup__form');
const addForm = addPopup.querySelector('#add-popup__form');
const cardName = imagePopup.querySelector('#image-popup__name');
const cardImage = imagePopup.querySelector('#image-popup__image');
const name = addPopup.querySelector('#name');
const link = addPopup.querySelector('#link');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');

/*основная функциональность*/

function showImagePopup(cardData) {
  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  openPopup(imagePopup);
}

const createCard = (item) => {
  const card = new Card(item, '.cards__card-template', 
  showImagePopup: () => {
    cardImagePopup.open();
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

const editProfilePopup = new PopupWithForm('#popup', {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close()
  }
})
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('#add-popup', {
  submitCallback: () => {
    const data = getForm();
    cards.addItem(createCard(data), 'prepend');
    addForm.reset();
    addFormValidator.disableButton();
    addCardPopup.close();
  }
})
addCardPopup.setEventListeners();

editButton.addEventListener('click', () => {
  editProfilePopup.open();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
})

const cardImagePopup = new PopupWithImage('#image-popup');

addButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addCardPopup.open();
});


/*валидация*/
const addFormValidator = new FormValidator(settings, addForm);
const editFormValidator = new FormValidator(settings, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();