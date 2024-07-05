import { Component } from '@angular/core';
import { MeubleService } from 'src/app/service/meuble-service/meuble.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  public constructor(
    private meubleServ : MeubleService
  ){}

  public ngOnInit() : void {
    this.getMeubles();
  }

  public getMeubles() : void {
    //todo
  }

}
