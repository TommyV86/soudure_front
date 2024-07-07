import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meuble } from 'src/app/model/meuble/meuble';
import { MeubleService } from 'src/app/service/meuble-service/meuble.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent {

  protected loading!: boolean;
  protected typeMeubleId!: string;
  protected meubles!: Meuble[];
  protected typeMeubleName!: string | null | undefined;

  public constructor(
    private route: ActivatedRoute,
    private meubleServ: MeubleService
  ){}

  public ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.typeMeubleId = String(params.get('id'));
      this.getMeublesByIdTypeMeuble();
      window.scrollTo(0, 0);
    })
  }

  public getMeublesByIdTypeMeuble() : void {
    this.loading = true; 
    this.meubleServ.getUrlAllByIdTypeMeuble(this.typeMeubleId).subscribe({
      next:(datas: Meuble[])=>{
        this.meubles = datas;
        this.typeMeubleName =this.meubles.at(0)?._typeMeubleDto?._nom;
        console.log('products ',this.typeMeubleId,':', this.meubles);        
      },
      error:(e)=>{
        console.log('error : ', e);
      },
      complete:()=>{
        this.loading = false;
        console.log('get by type id complete');
      }
    })
  }

}
