import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../../service/countries.service';
import { Region } from '../../interfaces/country.interface';
import { __values } from 'tslib';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {
  
  ngOnInit(): void {
    this.onRegionChanged()
   }

  onRegionChanged():void{
    this.myForm.get('region')!.valueChanges
    .subscribe( value =>{
      console.log( {region: value});
      
    })
  }

  public myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }

  get regions(): Region[] {
    return this.countriesService.regions
  }

}
