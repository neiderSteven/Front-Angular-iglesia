
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public telefono: number,
        public distrito: string,
        public cargo: string,
        public referencia?: string,
        public img?: string,
        public _id?: string
    ) { }

}


