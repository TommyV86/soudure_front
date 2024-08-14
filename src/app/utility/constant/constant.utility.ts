import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConstantUtility {

    private localhost: string = 'https://localhost:8000/';
    //private localhost: string = 'https://steelcraft.shop/public/';
    private urlMeubleRoute : string = "meuble/";

    // Form data
    public formData = {
        furnitureType: 'table',
        woodType: 'chene',
        size: 'petit',
        legType: 'type1'
    };

    public sizesTable = ['petit', 'grand'];
    public sizesShelf = ['petit', 'moyen', 'grand', 'tres grand'];
    public woodTypes = ['chene', 'chataigner'];
    public littleLegTypes = ['type1', 'type2', 'type3'];
    public tallLegTypes = ['type1', 'type2', 'type3'];

    public woodTextures = {
        chene : 'assets/image/texture/b1.jpg',
        chataigner : '/assets/image/texture/bois.jpg'
    }  
    
    public littleFlatPaths = {
        type_1: 'assets/glb/piece/table_basse/plateau/plateau_tb1.glb',
        type_2: 'assets/glb/piece/table_basse/plateau/plateau_tb2.glb'
    };

    public tallFlatPaths = {
        type_1: 'assets/glb/piece/table/plateau/plateau_tl1.glb'
    };

    public litteFeetPaths = {
        type_1: 'assets/glb/piece/table_basse/pieds/pieds_table_basse.glb',
        type_2: 'assets/glb/piece/table_basse/pieds/pieds_table_basse_2.glb',
        type_3: 'assets/glb/piece/table_basse/pieds/pieds_table_basse_3.glb'
    };

    public tallFeetPaths = {
        type_1: 'assets/glb/piece/table/pieds/pieds_tl1.glb',
        type_2: 'assets/glb/piece/table/pieds/pieds_tl2.glb',
        type_3: 'assets/glb/piece/table/pieds/pieds_tl3.glb',
    };

    public getLocalHost() : string {
        return this.localhost;
    }

    public getUrlMeuble() : string {
        return this.urlMeubleRoute;
    }
}