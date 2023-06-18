export class Card {
    constructor(card, templateSelector, showImagePopup) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
        this._showImagePopup = showImagePopup;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.cards__image');
        this._deleteButton = this._element.querySelector('.cards__delete-button');
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._element.querySelector('.cards__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeneners();
        return this._element;
    }

    _like() {
        this._likeButton.classList.toggle('cards__like-button_active');
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }


    _setEventListeneners() {
        this._likeButton.addEventListener('click', () => this._like());
        this._deleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () =>
            this._showImagePopup({ link: this._link, name: this._name }))
    }
};
