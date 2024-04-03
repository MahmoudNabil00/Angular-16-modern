import { Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit, Output, computed, inject, signal } from '@angular/core';
import { GeneralService, IProduct } from '../general.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit,OnDestroy{
  @Output() emitTestToRouterOutlet = new EventEmitter
  // @Input({required:true,alias:'v16'}) requiredInput:any
  testSignalArr = signal<any>([1,2,3,4,5,6,7])
  test = [1,2,3,4,5,6,7]
  data:any
  destroyRef = inject(DestroyRef)
  signalOne = signal<any>(5)
  signalTwo = signal<any>(5)
  // private route = inject(ActivatedRoute)
  changeNormalInput = 'Default message'
  changeNormalInputFn(){
    this.changeNormalInput = 'Changed'
  }
  constructor(public service:GeneralService , private route : ActivatedRoute){}
 
  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }

  supscription = new Subscription();  number : any


  // myObservable$:any = of({name:'Abood',age:24})
  timer1 = timer(6000, 1000).pipe(take(10));

  test2 = new String()

  ngOnInit(): void {
      // console.log(this.myObservable$)
     this.supscription =  this.timer1.subscribe((res:any)=>{
        console.log(res)
      },(e:any)=>{
        console.log(e)
      },()=>{
        console.log('Action Completed')
      })
    let testIfSignal = computed(()=>this.signalOne() + this.signalTwo())
    // let testIfSignal = this.signalOne() + this.signalTwo()
    console.log(testIfSignal());
    this.testSignalArr().push(10)
    console.log(this.testSignalArr());
    
    let splicedElement = this.test.splice(1,1)
    this.testSignalArr().forEach((ele:any)=>{
      ele = ele*2
      // console.log(ele)
    })
    this.service.products$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
      this.data = res
    })
    console.log(splicedElement);
  }

  //using behavior subject
  // addToCart(product: IProduct){
  //   this.service.addProduct(product);
  // }
  
  //using signal
  addToCart(product: IProduct){
    this.emitTestToRouterOutlet.emit(product)
    // console.log(product);
    
    if(this.service.signal_cartItems().includes(product)){
      // product.duplicated = true
      this.service.signal_AddProductToCart(product,true)
    }else{
      // product.duplicated = false
      this.service.signal_AddProductToCart(product,false)
    }
  }
}
