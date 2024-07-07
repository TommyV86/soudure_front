import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantUtility } from 'src/app/utility/constant/constant.utility';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private urlMailer = 'email/send-mail';

  public constructor(
    private constantUtil : ConstantUtility,
    private httpClient : HttpClient
  ) { }

  public sendMail(mail: any) : Observable<any>{
    const options = { 
      headers: {'Content-Type': 'application/json'},
      withCredentials: true 
    };

    return this.httpClient.post(
      this.constantUtil.getLocalHost() 
      + this.urlMailer, mail, options
    );
  }
}
