import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-input-routes',
  templateUrl: './input-routes.component.html',
  styleUrls: ['./input-routes.component.scss']
})
export class InputRoutesComponent implements OnInit{
  @ViewChild(CartComponent) cartInstance!: CartComponent;
  testXSSAttack:any
  showMe:any = false
  @Input() id : any
  @Input() ids : any
  ifShow = true

  constructor(private DomSanitizer:DomSanitizer){
    
  }
  ngOnInit(): void {
    this.DomSanitizer.bypassSecurityTrustHtml(this.testXSSAttack)
  }
  onClick(){
    this.DomSanitizer.bypassSecurityTrustHtml(this.testXSSAttack)
  }
  testClick(text:any){
    this.cartInstance.testViewChild(text)
    console.log(this.cartInstance.checked)
  }
  // <svg height="100" width="100">
  // <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  // Sorry, your browser does not support inline SVG.  
  // </svg> 

}
