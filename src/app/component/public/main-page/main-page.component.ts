import { Component } from '@angular/core';
import { Meuble } from 'src/app/model/meuble/meuble';
import { MeubleService } from 'src/app/service/meuble-service/meuble.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  protected displayedMeubles! : Meuble[];
  protected loading!: boolean;

  public constructor(
    private meubleServ : MeubleService
  ){}

  public ngOnInit() : void {
    window.scrollTo(0, 0);
    this.getMeubles();
  }

  public getMeubles() : void {
    this.loading = true; 
    this.meubleServ.getAll().subscribe({
      next: (datas: Meuble[]) => {
        this.displayedMeubles = datas;
      },
      error: (e) => console.log(e),
      complete: () => {
        this.loading = false;
      }
    })
  }

}
