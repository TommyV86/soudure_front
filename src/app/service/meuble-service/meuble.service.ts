import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantUtility } from 'src/app/utility/constant/constant.utility';

@Injectable({
  providedIn: 'root'
})
export class MeubleService {

  private urlGetAll : string = "all";
  private urlGetByName : string = "getByName";
  private urlAllByIdTypeMeuble : string = "allByIdTypeMeuble";


  public constructor(
    private httpClient: HttpClient, 
    private constantUtil: ConstantUtility
  ) {}

  public getAll() : Observable<any> {
    return this.httpClient.get(
      this.constantUtil.getLocalHost() + 
      this.constantUtil.getUrlMeuble() +
      this.urlGetAll
    );
  }

  public getByName(name: string) : Observable<any>{
    return this.httpClient.get(
    `${this.constantUtil.getLocalHost() + 
      this.constantUtil.getUrlMeuble() +
      this.urlGetByName}?nom=${name}`
    );
  }

  public getUrlAllByIdTypeMeuble(idParam: string) : Observable<any>{
    return this.httpClient.get(
    `${this.constantUtil.getLocalHost() + 
      this.constantUtil.getUrlMeuble() +
      this.urlAllByIdTypeMeuble}?id=${idParam}`
    );
  }
}