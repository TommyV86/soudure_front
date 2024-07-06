import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meuble } from 'src/app/model/meuble/meuble';
import { MeubleService } from 'src/app/service/meuble-service/meuble.service';

@Component({
  selector: 'app-details-meuble',
  templateUrl: './details-meuble.component.html',
  styleUrls: ['./details-meuble.component.scss']
})
export class DetailsMeubleComponent {

  protected loading!: boolean;
  protected productName!: string;
  protected meuble!: Meuble;

  public constructor(
    private route: ActivatedRoute,
    private meubleServ: MeubleService
  ){}

  public ngOnInit() : void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      this.productName = String(params.get('nom'));
    })
    this.getProductByName();
  }

  public getProductByName() : void {
    this.loading = true; 
    this.meubleServ.getByName(this.productName).subscribe({
      next:(data: Meuble)=>{
        this.meuble = data;
        console.log('product', this.meuble);        
      },
      error:(e)=>{
        console.log('error : ', e);
      },
      complete:()=>{
        this.loading = false;
        console.log('get by name complete');
      }
    })
  }
}
