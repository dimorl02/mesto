import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { settings, settingsApi } from '../utils/constants.js';
import { Api } from '../components/Api.js'
import {
  editForm,
  addForm,
  avatarForm,
  addButton,
  editButton,
  avatarButton
}
  from '../utils/constants.js';
import '../pages/index.css';


/*основная функциональность*/
const createCard = (data, user) => {
  const card = new Card({
    card: data,
    user: user,
    templateSelector: '.cards__card-template',
    showImagePopup: () => {
      cardImagePopup.open(data);
    },
    likeCard: (cardId) => {
      api.likeCardApi(cardId)
        .then((res) => {
          card.renderLikeCounter(res);
        })
        .catch((err) => alert(err))
    },
    dislikeCard: (cardId) => {
      api.dislikeCardApi(cardId)
        .then((res) => {
          card.renderLikeCounter(res)
        })
        .catch((err) => alert(err))
    },
    deleteCard: (cardId, cardElement) => {
      deleteCardPopup.open(cardId, cardElement);
    },

  });

  return card.generateCard();
}


/* api*/
const api = new Api(settingsApi);
let UserId;
Promise.all([api.getInitialCards(), api.getUserInfoApi()])
  .then(([resCard, resUser]) => {
    console.log(resCard);
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cards.renderItems(resCard, resUser)
  })
  .catch((err) => alert(err))


/* создание классов*/
const editProfilePopup = new PopupWithForm('#popup', {
  submitCallback: (data) => {
    console.log(data)
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editProfilePopup.close();
      })
      .catch((err) => alert(err))
  }
})

const cards = new Section({
  renderer: (item, userId) => {
    cards.addItem(createCard(item, userId), 'prepend');
  },
}, '.cards'
);

const cardImagePopup = new PopupWithImage('#image-popup');
cardImagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  briefSelector: '.profile__brief',
  avatarSelector: '.profile__image',
})

const addCardPopup = new PopupWithForm('#add-popup', {
  submitCallback: (item) => {
    api.addCardApi(item)
    .then((card) => {
      cards.addItem(createCard(card, UserId))
      addFormValidator.disableButton();
      addCardPopup.close();
    })
    .catch((err) => alert(err))
  }
})

const deleteCardPopup = new PopupWithConfirmation('#confirm-popup', {
  submitCallback: (id, card) => {
    api.deleteCardApi(id)
    .then(() => {
      card.deleteCard();
      deleteCardPopup.close();
    })
    .catch((err) => alert(err))
  }
})

const editAvatarPopup = new PopupWithForm('#avatar-popup', {
  submitCallback: (data) => {
    console.log(data)
    api.setUserAvatarApi(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      editAvatarPopup.close();
    })
    .catch((err) => alert(err))
  }
})

/*слушатели*/
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

addButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addCardPopup.open();
});

avatarButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  editAvatarPopup.open();
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