export class TypeMeuble {

    private _id!: number | null;
    private _nom!: string | null;


    public getId() : number | null {
        return this._id;
    }

    public getNom() : string | null {
        return this._nom;
    }
}