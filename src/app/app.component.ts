import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Respezy';

  activities = []
  available_slots = {
    1: "9:00 AM - 9:30 AM",
    2: "9:30 AM - 10:00 AM",
    3: "1:00 PM - 2:00 PM"
  }

  available_slots_list = []

  locations = [
    {
      id: 'lounge1',
      name: 'Lounge 1',
      available_slots: [1, 2]
    },
    {
      id: 'lounge2',
      name: 'Lounge 2',
      available_slots: [3]
    },
    {
      id: 'dining',
      name: 'Dining Hall',
      available_slots: [1, 2, 3]
    },
    {
      id: 'barker',
      name: 'Barker Library',
      available_slots: [1]
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
      location: values.location,
      other_location: values.other_location,
      available_slots: this.available_slots[values.available_slots],
      score: 0
    };
    
    currActivity.score = this.calculateScore(currActivity)
    
    this.activities.push(currActivity)
    
    this.updateScore();

    formObj.reset();
  }

  calculateScore(activity) {
    if (activity.location === 'lounge1') {
      activity.score = 0.10
    } else if (activity.location === 'lounge2') {
      activity.score = 0.25
    } else if (activity.location === 'dining') {
      activity.score = 0.15
    } else if (activity.location === 'barker') {
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
}
