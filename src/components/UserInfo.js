export class UserInfo {
    constructor({ nameSelector, briefSelector, avatarSelector}) {
      this._profileName = document.querySelector(nameSelector);
      this._profileJob = document.querySelector(briefSelector);
      this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
      return {
        name: this._profileName.textContent,
        about: this._profileJob.textContent,
      }
    }
  
    setUserInfo({name, about}) {
      this._profileName.textContent = name;
      this._profileJob.textContent = about;
    }

    setUserAvatar(link) {
      this._profileAvatar.src = link.avatar
    }
  
  };