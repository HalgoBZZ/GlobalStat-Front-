import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-nouveaute',
  templateUrl: './nouveaute.component.html',
  styleUrls: ['./nouveaute.component.css']
})
export class NouveauteComponent {

  chart = new Chart({
    chart: {
      type: 'area'//line,pie, bar, column, area
    },
    title: {
      text: 'Example'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });
 
  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }


}
