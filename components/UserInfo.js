export class UserInfo {
    constructor({ nameSelector, briefSelector}) {
      this._profileName = document.querySelector(nameSelector);
      this._profileJob = document.querySelector(briefSelector);
    }
  
    /**Функция получения информации из профиля */
    getUserInfo() {
      return {
        name: this._profileName.textContent,
        brief: this._profileJob.textContent,
      }
    }
  
    setUserInfo({name, brief}) {
      this._profileName.textContent = name;
      this._profileJob.textContent = brief;
    }
  
  };