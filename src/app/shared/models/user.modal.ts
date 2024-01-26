export class User {
    constructor(
        public email: string,
        public password: string,
        public nameUser: string,
        public id?: number,
    ) {
    }
}
