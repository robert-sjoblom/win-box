
class Manager {
  private updater;
// access_token: 'l4k0M7CsrbAAAAAAAAAAKskEC3SCsKi1ajezG4_8tbHWafx_TXyZLhEUXyCu0_MK'
  _state = {
    userDetails: { access_token: 'l4k0M7CsrbAAAAAAAAAAKskEC3SCsKi1ajezG4_8tbHWafx_TXyZLhEUXyCu0_MK' },
    Location: 'root',
    FileList: {},
    starredItems: [],
  };

  constructor() {
    try {

    } catch (error) {

    }
  }


  statehandlers = {
    'FileList': ([location, res]) => {
      // const loc = (!location) ? 'root' : location; // can't use empty string as key
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
        ...this.state,
        starredItems: newList
      };
    }
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
    console.log('yooo', stateToSave);
    localStorage.setItem('win-box', JSON.stringify(stateToSave));
    console.log(JSON.parse(localStorage.getItem('win-box')));

  }

  // hanterar att uppdatera state för alla subscribers
  setUpdater(updater) {
    this.updater = updater;
  }
}

export default new Manager();
