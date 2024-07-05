import { Matiere } from "../matiere/matiere";
import { TypeMeuble } from "../typeMeuble/type-meuble";

export class Meuble {

    private _nom!: string | null;
    private _hauteur!: number | null;
    private _longueur!: number | null;
    private _largeur!: number | null;
    private _prix!: number | null;
    private _typeMeuble!: TypeMeuble | null;
    private _matieres!: Matiere[] | null;

    public getNom() : string | null {
        return this._nom;
    }

    public getHauteur() : number | null {
        return this._hauteur;
    }

    public getLongueur() : number | null {
        return this._longueur;
    }

    public getLargeur() : number | null {
        return this._largeur;
    }

    public getPrix() : number | null {
        return this._prix;
    }

    public getTypeMeuble() : TypeMeuble | null {
        return this._typeMeuble;
    }

    public getMatieres() : Matiere[] | null | undefined {
        return this._matieres;
    }
}
