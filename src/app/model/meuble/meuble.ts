import { Matiere } from "../matiere/matiere";
import { TypeMeuble } from "../typeMeuble/type-meuble";

export class Meuble {

    public _nom!: string | null;
    public _hauteur!: number | null;
    public _longueur!: number | null;
    public _largeur!: number | null;
    public _prix!: number | null;
    public _typeMeuble!: TypeMeuble | null;
    public _matieres!: Matiere[] | null;

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
