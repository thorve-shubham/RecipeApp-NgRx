export class User {
    constructor(
        public email: string,
        public usreId : string,
        private _token : string,
        private _tokenExpirationDate : Date
    ) {}

    get token() : string {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        } else {
            return this._token;
        }
    }
}