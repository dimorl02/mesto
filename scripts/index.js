let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let addpopup = document.querySelector('.add-popup');
let imagepopup = document.querySelector('.image-popup');
let info = profile.querySelector('.profile__info');
let cardsList = document.querySelector('.cards');
let cardTemplate = document.querySelector('.cards__card-template').content;

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



let form = popup.querySelector('.popup__form');
let author = info.querySelector('.profile__author');
let textname = author.querySelector('.profile__name');
let textbrief = author.querySelector('.profile__brief');
let cardname = addpopup.querySelector('.popup__name_type_name');
let cardimage = addpopup.querySelector('.popup__name_type_image');

let popupname = popup.querySelector('.popup__text_type_name');
let popupbrief = popup.querySelector('.popup__text_type_brief');


let addButton = profile.querySelector('.profile__add-button');
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let secondcloseButton = addpopup.querySelector('.add-popup__close-button');
let createButton = addpopup.querySelector('.add-popup__create-button');

let thirdcloseButton = addpopup.querySelector('.image-popup__close-button');


function openPopup() {
  popupname.value = textname.textContent;
  popupbrief.value = textbrief.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openAddPopup() {
  addpopup.classList.add('add-popup_opened');
}

function closeAddPopup() {
  addpopup.classList.remove('add-popup_opened');
}

function openImagePopup() {
  imagepopup.classList.add('image-popup_opened');
}

function closeImagePopup() {
  imagepopup.classList.remove('image-popup_opened');
}


function editProfile(evt) {
  evt.preventDefault();
  textname.textContent = popupname.value;
  textbrief.textContent = popupbrief.value;
  closePopup();
}


renderCards();




function addCard(evt) {
  evt.preventDefault();
  const name = cardname.value;
  const link = cardimage.value;
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__name').textContent = name;
  cardElement.querySelector('.cards__image').src = link;
  const newcard = { name, link };
  cardsList.prepend(cardElement);
  initialCards.unshift(newcard);
  
  cardElement.querySelector('.cards__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  const LikeButton = cardElement.querySelector('.cards__like-button');
    LikeButton.addEventListener('click', () => {
    LikeButton.classList.toggle('cards__like-button_active');
    });



  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    imagepopup.querySelector('.image-popup__name').textContent = name;
    imagepopup.querySelector('.image-popup__image').src = link;
    imagepopup.querySelector('.image-popup__image').alt = link;
    openImagePopup();
    
    imagepopup.querySelector('.image-popup__close-button').addEventListener('click', () => {
      closeImagePopup();
    });
  });

}

function renderCards() {
  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);

    cardElement.querySelector('.cards__image').addEventListener('click', () => {
      imagepopup.querySelector('.image-popup__name').textContent = element.name;
      imagepopup.querySelector('.image-popup__image').src = element.link;
      imagepopup.querySelector('.image-popup__image').alt = element.link;
      openImagePopup();
      
      imagepopup.querySelector('.image-popup__close-button').addEventListener('click', () => {
        closeImagePopup();
      });
    });

    
    cardElement.querySelector('.cards__name').textContent = element.name;
    cardElement.querySelector('.cards__image').src = element.link;

    cardElement.querySelector('.cards__delete-button').addEventListener('click', () => {
      cardElement.remove();
    });

    const LikeButton = cardElement.querySelector('.cards__like-button');
    LikeButton.addEventListener('click', () => {
    LikeButton.classList.toggle('cards__like-button_active');
    });

    cardsList.append(cardElement);
    
  });
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


addButton.addEventListener('click', openAddPopup);
secondcloseButton.addEventListener('click', closeAddPopup);


createButton.addEventListener('click', addCard);

form.addEventListener('submit', editProfile);

