const profile = document.querySelector('.profile');
const editpopup = document.querySelector('#popup');
const addpopup = document.querySelector('#add-popup');
const imagepopup = document.querySelector('#image-popup');
const info = profile.querySelector('.profile__info');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__card-template').content;

const form = editpopup.querySelector('.popup__form');
const author = info.querySelector('.profile__author');
const textname = author.querySelector('.profile__name');
const textbrief = author.querySelector('.profile__brief');
const cardname = addpopup.querySelector('#add-popup__text');
const cardimage = addpopup.querySelector('#add-popup__image');

const popupname = editpopup.querySelector('#popup__text');
const popupbrief = editpopup.querySelector('#popup__brief');


const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const closeButton = editpopup.querySelector('.popup__close-button');
const secondcloseButton = addpopup.querySelector('#add-popup__close-button');
const createButton = addpopup.querySelector('#add-popup__create-button');

const thirdcloseButton = addpopup.querySelector('#image-popup__close-button');


function openPopup(popup) {
  popup.classList.add('popup_opened');
  }


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function editProfile(evt) {
  evt.preventDefault();
  textname.textContent = popupname.value;
  textbrief.textContent = popupbrief.value;
  closePopup(editpopup);
}

renderCards();

function createCard(name, link) {
  let cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  cardElement.querySelector('.cards__name').textContent = name;
  cardElement.querySelector('.cards__image').src = link;
  const newcard = { name, link };
  cardsList.prepend(cardElement);
  initialCards.unshift(newcard);

  cardElement.querySelector('.cards__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.cards__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('cards__like-button_active');
  });

  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    imagepopup.querySelector('#image-popup__name').textContent = name;
    const img = imagepopup.querySelector('#image-popup__image')
    img.src = link;
    img.alt = name;
    openPopup(imagepopup);
    
    imagepopup.querySelector('#image-popup__close-button').addEventListener('click', () => {
      closePopup(imagepopup);
    });

  });
}

function addCard(evt) {
  evt.preventDefault();
  let name = cardname.value;
  let link = cardimage.value;
  createCard(name, link);
  closePopup(addpopup);
}

function renderCards() {
  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
    cardElement.querySelector('.cards__image').addEventListener('click', () => {
    const img = imagepopup.querySelector('#image-popup__image');
    imagepopup.querySelector('#image-popup__name').textContent = element.name;
    img.src = element.link;
    img.alt = element.name;
    openPopup(imagepopup);
      
    imagepopup.querySelector('#image-popup__close-button').addEventListener('click', () => {
      closePopup(imagepopup);
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


profile.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupname.value = textname.textContent;
  popupbrief.value = textbrief.textContent;
  openPopup(editpopup);
});

popup.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(editpopup);
});

profile.querySelector('.profile__add-button').addEventListener('click', () => {
  openPopup(addpopup);
});
addpopup.querySelector('#add-popup__close-button').addEventListener('click', () => {
  closePopup(addpopup);
});

createButton.addEventListener('click', addCard);
form.addEventListener('submit', editProfile);

