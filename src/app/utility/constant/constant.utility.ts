import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConstantUtility {

    private localhost: string = 'https://localhost:8000/';
    private urlMeubleRoute : string = "meuble/";

    public getLocalHost() : string {
        return this.localhost;
    }

    public getUrlMeuble() : string {
        return this.urlMeubleRoute;
    }
}