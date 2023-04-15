let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let elements = document.querySelector('.elements');

let info = profile.querySelector('.profile__info');
let list = elements.querySelector('.elements__list');
let element = list.querySelector('.elements__element');
let area = element.querySelector('.elements__area');
let field = area.querySelector('.elements__field');
let likeButton = field.querySelector('.elements__likeButton');


let author = info.querySelector('.profile__author');
let textname = author.querySelector('.profile__name');
let textbrief = author.querySelector('.profile__brief');

let popupname = popup.querySelector('.popup__text_type_name');
let popupbrief = popup.querySelector('.popup__text_type_brief');




let addButton = profile.querySelector('.profile__addButton');
let editButton = profile.querySelector('.profile__editButton');
let closeButton = popup.querySelector('.popup__closeButton');
let saveButton = popup.querySelector('.popup__saveButton');

popupname.value = textname.textContent;
popupbrief.value = textbrief.textContent;

function openPopup() {
    popup.classList.add('popup_opened'); 
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function editProfile() {
    textname.textContent = popupname.value;
    textbrief.textContent = popupbrief.value;
}

function likeDislike() {
    likeButton.classList.toggle('elements__likeButton_active'); 
}

// function opacity() {
//     if (likeButton.classList.contains('elements__likeButton_active') === false) {
//         likeButton.classList.add('elements__likeButton_dragged')
//     }
// }

editButton.addEventListener('click', openPopup); 
closeButton.addEventListener('click', closePopup); 
saveButton.addEventListener('click', editProfile); 
likeButton.addEventListener('click', likeDislike); 
// likeButton.addEventListener('drag', opacity); 