import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // state knows stuff
  // like, access tokens
  userInfo;





  constructor() { }

  setAccessTokenFromUrl(url: string): Promise<boolean> {
    this.userInfo = url.split('#')
    .reduce((acc, cur, i) => { // we want an object with key: value from the string
        if (!i) {
            return acc;
        }
        return acc = {
            // spread the object from the inner reduce onto the outer reduce object
            ...cur.split('&') // array of keys=values strings
                .map(item => item.split('=')) // we have [keys, values] instead
                .reduce((acc2, cur2) => { // make an object
                    acc2[cur2[0]] = cur2[1];
                    return acc2;
                }, {})
        };
    }, {});
    return Promise.resolve(true);
  }

}
