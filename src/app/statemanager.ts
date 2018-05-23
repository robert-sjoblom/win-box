
class Manager {
  private updater;

  _state = {
    userDetails: { access_token: '' },
    Location: 'root',
    FileList: {},
    starredItems: {},
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
    console.log('yay', userDetails);

  }

  // hanterar att uppdatera state för alla subscribers
  setUpdater(updater) {
    this.updater = updater;
  }
}

export default new Manager();
