export const editPopup = document.querySelector('#popup');
export const addPopup = document.querySelector('#add-popup');
export const confirmPopup = document.querySelector('#confirm-popup');
export const avatarPopup = document.querySelector('#avatar-popup');
export const editForm = editPopup.querySelector('#popup__form');
export const addForm = addPopup.querySelector('#add-popup__form');
export const avatarForm = avatarPopup.querySelector('#avatar-popup__form');
export const profile = document.querySelector('.profile');
export const addButton = profile.querySelector('.profile__add-button');
export const editButton = profile.querySelector('.profile__edit-button');
export const avatarButton = profile.querySelector('.profile__image');
export const name = addPopup.querySelector('#name');
export const link = addPopup.querySelector('#link');

// export const initialCards = [
//     {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
//   ];
  
export const settings =
{
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    setSelector: '.popup__set',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error_active'
}

export const settingsApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers:{
    authorization: '95a01d31-8d5f-43f8-b501-fe9ff75514f9',
    'Content-Type': "application/json"
  }
}