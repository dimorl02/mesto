let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let addpopup = document.querySelector('.add-popup');
let elements = document.querySelectorAll('.elements__element');
let info = profile.querySelector('.profile__info');
let cardsList = document.querySelector('.cards');
let card = document.querySelector('.card').content;

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

let popupname = popup.querySelector('.popup__text_type_name');
let popupbrief = popup.querySelector('.popup__text_type_brief');


let addButton = profile.querySelector('.profile__add-button');
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let secondcloseButton = addpopup.querySelector('.add-popup__close-button');


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



function editProfile(evt) {
    evt.preventDefault();
    textname.textContent = popupname.value;
    textbrief.textContent = popupbrief.value;
    closePopup();
}


elements.forEach(function (element) {
    let likeButton = element.querySelector('.elements__like-button');
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('elements__like-button_active');
    });
    
});


initialCards.forEach(function (element) {
    const cardElement = card.cloneNode(true);
  
    cardElement.querySelector('.cards__name').textContent = element.name;
    cardElement.querySelector('.cards__image').src = element.link;
  
    cardsList.append(cardElement);
  })



editButton.addEventListener('click', openPopup); 
closeButton.addEventListener('click', closePopup); 

addButton.addEventListener('click', openAddPopup); 
secondcloseButton.addEventListener('click', closeAddPopup); 

form.addEventListener('submit', editProfile); 
 
 