class Card {
    constructor(name, link, showPopup) {
        this._name = name;
        this._link = link;
        this._showPopup = showPopup;
    }

    _getTemplate() {
        const cardElement = document.querySelector('.cards__card-template').content.querySelector('.cards__card').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector('.cards__delete-button');
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._element.querySelector('.cards__name').textContent = this._name;
        this._element.querySelector('.cards__image').src = this._link;
        this._element.querySelector('.cards__image').alt = this._name;
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
        this._element.querySelector('.cards__image').addEventListener('click', () =>
            this._showPopup({ link: this._link, name: this._name }))
    }
};

export { Card };