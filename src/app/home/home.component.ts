import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chart: any;
  
  @ViewChild('barChart', {static: true}) private chartRef;

  constructor() { }

  ngOnInit(): void {
    this.updateChart()
  }

  activities = []
  available_slots = {
    1: "9:00 AM - 9:30 AM",
    2: "9:30 AM - 10:00 AM",
    3: "10:00 AM - 11:00 AM",
    4: "1:00 PM - 2:00 PM",
    5: "2:00 PM - 2:30 PM",
    6: "2:30 PM - 3:00 PM",
    7: "3:00 PM - 3:30 PM",
    8: "3:30 PM - 4:00 PM",
    9: "6:00 PM - 7:00 PM",
    10: "7:00 PM - 8:00 PM"
  }

  available_slots_list = []
  places = {
    'lounge1': 'Lounge 1',
    'lounge2': 'Lounge 2',
    'dining': 'Dining Hall',
    'barker': 'Barker Library'
  }

  locations = [
    {
      id: 'lounge1',
      available_slots: [1, 2, 3]
    },
    {
      id: 'lounge2',
      available_slots: [1, 3, 6, 7]
    },
    {
      id: 'dining',
      available_slots: [4, 5, 6, 9, 10]
    },
    {
      id: 'barker',
      available_slots: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  ]

  activity = {
    location: '',
    other_location: '',
    available_slots: '',
    score: 0
  }

  score: number = 0;

  onSubmit(formObj) {
    let values = formObj.value;

    let currActivity: any = {
      location_id: values.location,
      location: this.places[values.location],
      other_location: values.other_location,
      available_slots: this.available_slots[values.available_slots],
      score: 0
    };
    
    currActivity.score = this.calculateScore(currActivity)
    
    this.activities.push(currActivity)
    
    this.updateScore()

    this.updateChart()

    formObj.reset()
  }

  calculateScore(activity) {
    if (activity.location_id === 'lounge1') {
      activity.score = 0.10
    } else if (activity.location_id === 'lounge2') {
      activity.score = 0.25
    } else if (activity.location_id === 'dining') {
      activity.score = 0.15
    } else if (activity.location_id === 'barker') {
      activity.score = 0.05
    } else {
      activity.score = 0.10
    }

    return activity.score
  }

  updateScore() {
    let sumScore: number = 0;
    for (let i = 0; i < this.activities.length; i++) {
      sumScore = sumScore + this.activities[i].score
    }

    this.score = Math.round((sumScore/this.activities.length)*100);
  }

  onSelect(value) {
    for (let i = 0; i < this.locations.length; i++) {
      if (this.locations[i].id === value) {
        this.available_slots_list = this.locations[i].available_slots
        break
      }
    }
  }

  updateChart() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        // labels1: ["Lounge1", "Lounge2", "Dining Hall", "Barker Library"],
        labels: this.activities.map(d => d.location),
        datasets: [{
            barPercentage: 1.0,
            categoryPercentage: 1.0,
            barThickness: 15,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: 'rgba(242, 106, 90, 1)',
            borderWidth: 0,
            // radius: 10,
            // pointStyle: 'circle',
            data: this.activities.map(d => d.score)
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              offsetGridLines: true
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
}
