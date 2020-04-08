export class Visita {

    constructor(
        public _id: string,
        public nombre: string,
        public telefono: number,
        public direccion: string,
        public estudios: number,
        public bautizado: string,
        public iglesia?:string
    ) { }
}