const profile = document.querySelector('.profile');
const popup = document.querySelector('#popup');
const addpopup = document.querySelector('#add-popup');
const imagepopup = document.querySelector('#image-popup');
const info = profile.querySelector('.profile__info');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__card-template').content;

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



const form = popup.querySelector('.popup__form');
const author = info.querySelector('.profile__author');
const textname = author.querySelector('.profile__name');
const textbrief = author.querySelector('.profile__brief');
const cardname = addpopup.querySelector('#add-popup__text');
const cardimage = addpopup.querySelector('#add-popup__image');

const popupname = popup.querySelector('#popup__text');
const popupbrief = popup.querySelector('#popup__brief');


const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-button');
const secondcloseButton = addpopup.querySelector('#add-popup__close-button');
const createButton = addpopup.querySelector('#add-popup__create-button');

const thirdcloseButton = addpopup.querySelector('#image-popup__close-button');


function openPopup(type) {
  if (type === 'popup') {
    popupname.value = textname.textContent;
    popupbrief.value = textbrief.textContent;
    popup.classList.add('popup_opened');
    }
  if (type === 'add-popup') {
    addpopup.classList.add('popup_opened');
    }
  if (type === 'image-popup') {
    imagepopup.classList.add('popup_opened');
    }
}

function closePopup(type) {
  if (type === 'popup') {
  popup.classList.remove('popup_opened');
    }

  if (type === 'add-popup') {
  addpopup.classList.remove('popup_opened');
    }

  if (type === 'image-popup') {
    imagepopup.classList.remove('popup_opened');
    }
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
    imagepopup.querySelector('#image-popup__name').textContent = name;
    imagepopup.querySelector('#image-popup__image').src = link;
    imagepopup.querySelector('#image-popup__image').alt = name;
    openPopup('image-popup');
    
    imagepopup.querySelector('#image-popup__close-button').addEventListener('click', () => {
      closePopup('image-popup');
    });
  });

}

function renderCards() {
  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);

    cardElement.querySelector('.cards__image').addEventListener('click', () => {
      imagepopup.querySelector('#image-popup__name').textContent = element.name;
      imagepopup.querySelector('#image-popup__image').src = element.link;
      imagepopup.querySelector('#image-popup__image').alt = element.name;
      openPopup('image-popup');
      
      imagepopup.querySelector('#image-popup__close-button').addEventListener('click', () => {
        closePopup('image-popup');
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


editButton.addEventListener('click', openPopup('popup'));
closeButton.addEventListener('click', closePopup('popup'));


addButton.addEventListener('click', openPopup('add-popup'));
secondcloseButton.addEventListener('click', closePopup('add-popup'));


createButton.addEventListener('click', addCard);

form.addEventListener('submit', editProfile);

