import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';



const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-angular-material',
  templateUrl: './angular-material.component.html',
  styleUrls: ['./angular-material.component.scss']
})
export class AngularMaterialComponent implements OnInit{
  @Output() amerOutlet = new EventEmitter
  exampleOne !: FormGroup
  filmIcon:any = 'filmIcon'
  faHouse:any = 'fa-house'
  arrow : any = 'keyboard_arrow_down'
  date : any 
  faFilm = faFilm
  campaignOne = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  // CompanyForm = new FormGroup({
  //   companyOne: new FormControl(new Date(year, month, 15),Validators.required),
  //   companyTwo: new FormControl(new Date(year, month, 19)),
  //   // comment : 
  // });

  CompanyDetails : FormGroup = this.formGroup.group({
    type: ['Abood',Validators.required,],
    email: ['',],
    comment: ['',[Validators.required,this.customValidator]],
    date : [new Date(),Validators.required]
  })

  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });
  //----------------------------------------------
  myControl : FormControl
  constructor(public formGroup:FormBuilder){}
  Test(event: Event){
    let target = event.target as HTMLInputElement
    console.log(target.value);
    if(target.value.length == 5){
      this.CompanyDetails.get('type')?.setValue('Done')
      
    }
    console.log(this.CompanyDetails.valid);
    console.log(this.CompanyDetails);
  }
  //----------------------------------------------
  ngOnInit(): void {

    this.exampleOne = this.formGroup.group({
      normalDate : new FormControl(new Date())
    })
  }
  showResult(){
    this.amerOutlet.emit(this.arrow)
    // console.log('*'.repeat(30));
    // console.log(this.campaignOne);
    // console.log('*'.repeat(30));
    // // console.log(this.campaignTwo);
    // console.log('*'.repeat(30));
    // console.log(this.campaignOne.get('start')?.touched);
    // console.log('*'.repeat(30));
    // console.log(this.campaignOne.controls.start.touched);
  }
  clearData(){
    this.campaignOne.get('start')?.setValue(null)
    this.campaignOne.controls['end'].setValue(null)
    // this.campaignOne.get('start')?.value = ''
  }
  showNormalResult(){
    console.log(this.exampleOne);
    // this.amerOutlet.emit(this.arrow)
  }
  customValidation (){
    //-
  }
  customValidator(control:AbstractControl){
    if(control.value.length>10  ){
      return { customError: true }; // Validation failed return an error 
    }else{
      return null
    }
  } 
} 