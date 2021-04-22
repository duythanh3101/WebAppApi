import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent implements OnInit{
  public forecasts: WeatherForecast[] | undefined;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log('base url', baseUrl);
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      console.log('forecasts', result);
      this.forecasts = result;

    }, 
    error => console.error(error));
  }
  ngOnInit(): void {
  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


