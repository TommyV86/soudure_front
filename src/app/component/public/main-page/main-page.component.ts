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
    this.getMeubles();
  }

  public getMeubles() : void {
    this.loading = true; 
    this.meubleServ.getAll().subscribe({
      next: (datas: Meuble[]) => {
        console.log('datas products fetched: ', datas);
        this.displayedMeubles = datas;
      },
      error: (e) => console.log(e),
      complete: () => {
        this.loading = false;
        console.log('get all meubles complete');
      }
    })
  }

}
