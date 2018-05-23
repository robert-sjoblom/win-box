class Manager {
  private updater;
  private _state: { Location: string; FileList: {}; userDetails: {}; starredItems: any[]; errorMessage: string; };

  constructor() {
    this._state = {
      Location: 'root',
      FileList: {},
      userDetails: {},
      starredItems: [],
      errorMessage: '',
    };

    if (localStorage.getItem('win-box') !== null) {
      const { userDetails, starredItems } = JSON.parse(localStorage.getItem('win-box'));
      // validate token here?
      this._state = { ...this._state, userDetails, starredItems };
    }
  }

  statehandlers = {
    'FileList': ([location, res]) => {
      const newListing = { ...this._state.FileList, [location]: res };
      this._state = {
        ...this._state, FileList: newListing
      };
    },
    'Location': ([location]) => {
      this._state = {
        ...this._state, Location: location
      };
    },
    'AddStar': ([file]) => {
      const starList = [...this._state.starredItems, file];
      this._state = {
        ...this._state,
        starredItems: starList
      };
    },
    'RemoveStar': ([file]) => {
      const newList = this._state.starredItems.filter((star: any) => star.id !== file.id);
      this._state = {
        ...this._state,
        starredItems: newList
      };
    },
    'AddUserDetails': ([userdetails]) => {
      const userDetails = userdetails;
      this._state = {
        ...this.state,
        userDetails
      };
    },
    'ErrorMessage': ([errorMessage]) => {
      // vid error message rensar vi ut user details
      // och sätter error message;
      this._state = {
        ...this._state,
        userDetails: {},
        errorMessage
      };
    },
  };

  invokeStatehandler(key, ...args) {
    // check if property exists
    this.statehandlers[key](args);
    this.updater();
    this.saveStateToStorage();
  }

  get state() {
    return this._state;
  }

  saveStateToStorage() {
    const { userDetails, starredItems } = this._state;
    const stateToSave = { userDetails, starredItems};
    localStorage.setItem('win-box', JSON.stringify(stateToSave));
  }

  setUpdater(updater) {
    // uppdaterar state för alla subscribers
    this.updater = updater;
  }
}

export default new Manager();
