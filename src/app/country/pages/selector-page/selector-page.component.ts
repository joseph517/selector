import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../service/countries.service';
import { Region, smallCountry } from '../../interfaces/country.interface';
import { __values } from 'tslib';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }

  
  ngOnInit(): void {
    this.onRegionChanged()
   }
   
   public countriesByRegion: smallCountry[] = []
   
  /**
   * A function that handles the change event for the region form control.
   */
  onRegionChanged():void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap( ()=> this.myForm.get('country')!.reset('') ),
      switchMap( region => this.countriesService.getCountryByRegion( region ) )
    )
    .subscribe( countries =>{
      this.countriesByRegion = countries
      
    })
  }

  
  get regions(): Region[] {
    return this.countriesService.regions
  }

}
