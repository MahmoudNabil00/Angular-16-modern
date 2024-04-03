import { HttpClient } from '@angular/common/http';
import {toSignal,toObservable} from '@angular/core/rxjs-interop'
import { Injectable, Signal, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  checkIfThisPropertyChangeEveryWhereInTheApp = 'MAHMOUD'
  //test hash # new feature instead of private
  #hashProperty:any = 'hash'

  public url = 'https://fakestoreapi.com/products'

  // get All Data-----+-----------------------------
  public products$ = this.http.get<IProduct[]>(this.url)
  // create signal from Observable -> the api will return list as signal
  public signal_GetAllProducts  = toSignal<IProduct[]>(this.http.get<IProduct[]>(this.url))
  ///-------------------------------------------

  // Cart items behaviorSubject and Signal //
  public cartItems$ = new BehaviorSubject<IProduct[]>([])
  public signal_cartItems = signal<IProduct[]>([])
  // -------------------------------

  // Cart items behaviorSubject and Signal //
  public subTotal$ = new BehaviorSubject<any>(0)
  public signal_subTotal : Signal<any> = computed(()=>this.signal_cartItems().reduce((prev:any,curr:any) => {
    return prev+curr.price
  },0))
   // -------------------------------

  // total items behaviorSubject and Signal //
  public TotalItems$ = new BehaviorSubject<any>(0)
  public signal_totalItems : Signal<any> = computed(() => this.signal_cartItems().length) //computed -> do some calculation for signal 
  //---------------------
  ifDuplicated : any = 0
  public products:IProduct[] = []
  constructor(private http: HttpClient) {}
  addProduct(product:IProduct){
    this.products.push(product)
    this.cartItems$.next(this.products)
    this.TotalItems$.next(this.products.length)
    this.mapTotal();
  }
  removeProduct(id:any){
    this.products.splice(id, 1);
    this.cartItems$.next(this.products)
    this.TotalItems$.next(this.products.length)
    this.mapTotal();
  }
  mapTotal(){
    const total = this.products.reduce((prev:any,curr:any) => {
      return prev+curr.price
    },0)
    this.subTotal$.next(total)
  }

  //*-*-*-*-*-*-*-*-*-Signal*-*-*-*-*-*-*-*-*-*-* :-

  signal_AddProductToCart(product:IProduct, ifExist?:boolean){
    // mutate : detect if there is any change in the signal and emit it 
    // val : the existing signal 

    // if(!ifExist){
      this.signal_cartItems.mutate(((val:any)=>{
        val.push(product)
      }))
    //   console.log(this.signal_subTotal());
    // }else{
    //     this.ifDuplicated++ 
    //     this.signal_subTotal = computed(()=>this.signal_cartItems().reduce((prev:any,curr:any) => {
    //       return prev+curr.price
    //     },0) + product.price)
    //     console.log(this.signal_subTotal());
    //     this.signal_totalItems = computed(() => this.signal_cartItems().length + this.ifDuplicated)
    // }
    
    // this.signal_cartItems.update((cart:any)=>{
    //   return cart.push(product)
    // })
    
    //Cannot work .
    // this.signal_cartItems().push(product)

    this.signal_GetAllProducts()?.forEach((ele:any)=>{
      if(ele.id==product.id){
        ele.rating.count = ele.rating.count-1
      }
    })
  }
  signal_RemoveProduct(id:any,product:IProduct){
    // this.signal_cartItems.mutate((val:IProduct[])=>{
    //   // const spliced = 
    //   val.splice(id, 1);
    // })

    this.signal_cartItems.update((val:IProduct[])=>{
      val.splice(id, 1);
      return val
    })
    
    // this.signal_GetAllProducts()?.forEach(ele=>{
    //   if(ele.id==product.id){
    //     ele.rating.count = ele.rating.count+1
    //   }
    // })
  }
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: IRating;
  duplicated?:boolean
}

interface IRating {
  rate: number;
  count: number;
}