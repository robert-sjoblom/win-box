import { IUserDetails } from '../interfaces/IUserDetails';

class Manager {
  private updater;
  private _state: {
    Location: string;
    FileList: {};
    userDetails: IUserDetails;
    starredItems: any[];
    breadcrumbs: string[];
    searchResult: any[]
    error?: string;
    cursor?: string;
  };

  constructor() {
    this._state = {
      Location: 'root',
      FileList: {},
      userDetails: {},
      starredItems: [],
      breadcrumbs: [],
      searchResult: []
    };

    if (localStorage.getItem('win-box') !== null) {
      const { userDetails, starredItems } = JSON.parse(localStorage.getItem('win-box'));
      this._state = { ...this._state, userDetails, starredItems };
    }
  }

  statehandlers = {
    'FileList': ([location, filelist]) => {
      const newListing = { ...this._state.FileList, [location]: filelist };
      this._state = {
        ...this._state, FileList: newListing
      };
    },
    'Location': ([location]) => {
      let breadcrumbs;
      if (location === 'root' || location === 'starred' || location === 'latestSearch') {
        breadcrumbs = [];
      } else if (this.state.breadcrumbs.includes(location)) {
        breadcrumbs = this.state.breadcrumbs.slice(0, this.state.breadcrumbs.indexOf(location) + 1);
      } else {
        breadcrumbs = [...this.state.breadcrumbs, location];
      }

      this._state = {
        ...this._state,
        breadcrumbs,
        Location: location,
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
      const newList = this._state.starredItems.filter((star: any) => star.path_lower !== file.path_lower);
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
    'Logout': () => {
      this.removeStateFromStorage();
      this.constructor(); // resets state.
    },
    'UpdateFileListing': ([changes]) => {
      const location = this.state.Location;
      const filelist = changes.reduce((acc, cur) => {
        if (['folder', 'file'].includes(cur['.tag'])) { // we should add something
          acc = [...acc, cur];
        } else if (cur['.tag'] === 'deleted') { // we should remove something.
          acc = acc.filter(item => item.path_lower !== cur.path_lower);
        }
        return acc;
      }, this.state.FileList[this.state.Location]);
      this.invokeStatehandler('FileList', location, filelist); // why duplicate code? We already have a function that does this.
    },
    'SearchResult': ([searchResult]) => {
      this._state = {
        ...this.state,
        searchResult
      }
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
    const stateToSave = { userDetails, starredItems };
    localStorage.setItem('win-box', JSON.stringify(stateToSave));
  }

  removeStateFromStorage() {
    localStorage.removeItem('win-box');
  }

  setUpdater(updater) {
    // uppdatestate for all subscribers.
    this.updater = updater;
  }
}

export default new Manager();
