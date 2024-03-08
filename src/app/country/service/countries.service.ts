import { Injectable } from "@angular/core";
import { Country, Region, smallCountry } from "../interfaces/country.interface";
import { Observable, map, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class CountriesService { 
    private baseUrl: string = 'https://restcountries.com/v3.1'

    private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania] 
    
    constructor(
        private http: HttpClient
    ) { }
    
    /**
     * Get the regions.
     *
     * @return {Region[]} an array of regions
     */
    get regions(): Region[] {
        return [...this._regions]
    }

    getCountryByRegion( region: Region):Observable<smallCountry[]>{
        if (!region) return of([])

        const url = `${ this.baseUrl }/region/${ region }?fields=cca3,name,borders`
        return this.http.get<Country[]>( url )
        .pipe(
            map( countries => countries.map( country => ({ 
                name: country.name.common, 
                cca3: country.cca3,
                borders: country.borders ?? []
            }) ) ),
            tap(  )
        )

    }
}