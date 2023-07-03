export class Card {
    constructor({card, user, templateSelector, showImagePopup, likeCard, dislikeCard, deleteCard}) {
        this._name = card.name;
        this._link = card.link;
        this._userId = user._id;
        this._templateSelector = templateSelector;
        this._showImagePopup = showImagePopup;
        this._likes = card.likes;
        this.cardId = card._id;
        this.cardData = card;
        this._cardUserId = card.owner._id;
        this._likeCounter = card.likes.length;
        this._deleteCard = deleteCard;
        this._likeCard = likeCard;
        this._dislikeCard = dislikeCard;
        
    }

    _getTemplate() {
        const cardElement = document.querySelector('.cards__card-template').content.querySelector('.cards__card').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.cards__image');
        this._deleteButton = this._element.querySelector('.cards__delete-button');
        this._likeButton = this._element.querySelector('.cards__like-button');
        this._element.querySelector('.cards__name').textContent = this._name;
        this._likeCounter = this._element.querySelector('.cards__like-counter');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this.renderLikeCounter(this.cardData);
        console.log(this._cardUserId, this._userId);

        if (this._cardUserId !== this._userId) {
             this._deleteButton.remove();
             
         }

        this._setEventListeners();
        return this._element;
    }

    isLiked() {
        return this._likes.some(like => like._id === this._userId)
      };

    toggleLikeCard() {
    if (this.isLiked()) {
        this._dislikeCard(this.cardId);
    } else {
        this._likeCard(this.cardId);
    }
    }

    renderLikeCounter(data) {
        this._likes = data.likes;
        if (this._likes.length === 0) {
            this._likeCounter.textContent = '0';
         } 
        else {
            this._likeCounter.textContent = this._likes.length
        }
      if (this.isLiked()) {
        this._likeButton.classList.add('cards__like-button_active');
      } else {
        this._likeButton.classList.remove('cards__like-button_active');
      }
    }
    
    deleteCard() {
        this.cardElement.remove();
        this.cardElement = null;
    };
    
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this.toggleLikeCard());
        this._deleteButton.addEventListener('click', () => this._deleteCard(this, this.idCard));
        this._cardImage.addEventListener('click', () => this._showImagePopup());
    };
};
