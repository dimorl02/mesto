const profile = document.querySelector('.profile');
const editPopup = document.querySelector('#popup');
const addPopup = document.querySelector('#add-popup');
const imagePopup = document.querySelector('#image-popup');
const info = profile.querySelector('.profile__info');
const cardsList = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__card-template').content;

const editForm = editPopup.querySelector('#popup__form');
const addForm = addPopup.querySelector('#add-popup__form');
const author = info.querySelector('.profile__author');
const textName = author.querySelector('.profile__name');
const textBrief = author.querySelector('.profile__brief');
const cardName = addPopup.querySelector('#name');
const cardImage = addPopup.querySelector('#link');

const popupName = editPopup.querySelector('#user');
const popupBrief = editPopup.querySelector('#brief');

const nm = imagePopup.querySelector('#image-popup__name');
const img = imagePopup.querySelector('#image-popup__image');
const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');
const createButton = addPopup.querySelector('#add-popup__create-button');



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
    const popupopened = document.querySelector('.popup_opened');
    closePopup(popupopened);
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

function addCard(evt) {
  evt.preventDefault();
  renderCards(cardName.value, cardImage.value);
  addForm.reset();
  disableButton(createButton, settings);
  closePopup(addPopup);
}


function returnCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
  const cardNm = cardElement.querySelector('.cards__name');
  const cardImg = cardElement.querySelector('.cards__image');
  cardNm.textContent = name;
  cardImg.src = link;
  cardImg.alt = name;
  return cardElement;
}


function createCard(name, link) {
  const cardElement = returnCard(name, link);

  cardElement.querySelector('.cards__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector('.cards__like-button');
  likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('cards__like-button_active');
  });

  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    nm.textContent = name;
    img.src = link;
    img.alt = name;
    openPopup(imagePopup);
  });
  return cardElement;
}


const renderCards = (name, link) => {
  cardsList.prepend(createCard(name, link));
}

const firstcards = initialCards.map(({ name, link }) => createCard(name, link));
cardsList.prepend(...firstcards);


profile.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupName.value = textName.textContent;
  popupBrief.value = textBrief.textContent;
  openPopup(editPopup);
});
editPopup.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(editPopup);
});

profile.querySelector('.profile__add-button').addEventListener('click', () => {
  openPopup(addPopup);
});
addPopup.querySelector('#add-popup__close-button').addEventListener('click', () => {
  closePopup(addPopup);
});

imagePopup.querySelector('#image-popup__close-button').addEventListener('click', () => {
  closePopup(imagePopup);
});


/*обработчики для отправки данных*/
editForm.addEventListener('submit', editProfile);
addForm.addEventListener('submit', addCard);