export class TypeMeuble {

    public _id!: number | null;
    public _nom!: string | null;


    public getId() : number | null {
        return this._id;
    }

    public getNom() : string | null {
        return this._nom;
    }
}