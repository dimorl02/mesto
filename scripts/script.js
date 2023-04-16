let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let elements = document.querySelector('.elements');

let info = profile.querySelector('.profile__info');


// let list = elements.querySelector('.elements__list');
// let element = list.querySelector('.elements__element');
// let area = element.querySelector('.elements__area');
// let field = area.querySelector('.elements__field');
// let likeButton = field.querySelector('.elements__like-Button');


let author = info.querySelector('.profile__author');
let textname = author.querySelector('.profile__name');
let textbrief = author.querySelector('.profile__brief');

let popupname = popup.querySelector('.popup__text_type_name');
let popupbrief = popup.querySelector('.popup__text_type_brief');


// let addButton = profile.querySelector('.profile__add-button');
let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let saveButton = popup.querySelector('.popup__save-button');



function openPopup() {
    popupname.value = textname.textContent;
    popupbrief.value = textbrief.textContent;
    popup.classList.add('popup_opened'); 
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function editProfile(evt) {
    evt.preventDefault();
    textname.textContent = popupname.value;
    textbrief.textContent = popupbrief.value;
    closePopup();
}

// function likeDislike() {
//     likeButton.classList.toggle('elements__like-button_active'); 
// }
// likeButton.addEventListener('click', likeDislike);

// function opacity() {
//     if (likeButton.classList.contains('elements__like-button_active') === false) {
//         likeButton.classList.add('elements__like-button_dragged')
//     }
// }

editButton.addEventListener('click', openPopup); 
closeButton.addEventListener('click', closePopup); 
saveButton.addEventListener('click', editProfile); 
 
// likeButton.addEventListener('drag', opacity); 