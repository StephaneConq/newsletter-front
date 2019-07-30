import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsletterApiService {

  private stories = [
    {
      category: 'SPORTS',
      title: 'Coucou',
      text: 'Blablalfvdlvlsdfvsdfv',
      img: '',
      checked: '',
      date: Date.parse('07/20/1997')
    },
    {
      category: 'SPORTS',
      title: 'Wesh',
      text: 'test',
      img: '',
      checked: '',
      date: Date.parse('08/20/1997')
    },
    {
      category: 'SPORTS',
      title: 'Wesh1',
      text: 'test',
      img: '',
      checked: '',
      date: Date.parse('07/02/1997')
    },
    {
      category: 'SPORTS',
      title: 'Wesh2',
      text: 'test',
      img: '',
      checked: '',
      date: Date.parse('06/20/1997')
    },
    {
      category: 'ENTERTAINMENT',
      title: 'Coucou2',
      text: 'efskejrnfjkehfiuc nouezxiu',
      img: '',
      checked: '',
      date: Date.parse('06/22/1997')
    },
    {
      category: 'ENTERTAINMENT',
      title: 'bg',
      text: 'regarde ça bg',
      img: '',
      checked: '',
      date: Date.parse('06/14/1997')
    },
    {
      category: 'ENTERTAINMENT',
      title: 'stories5',
      text: 'ça cest du lourd',
      img: '',
      date: Date.parse('06/15/1997'),
      checked: ''
    },
    {
      category: 'LIFESTYLE/EXTRA',
      title: 'bg1',
      text: 'regarde ça bg',
      img: '',
      date: Date.parse('06/15/1997'),
      checked: ''
    },
    {
      category: 'LIFESTYLE/EXTRA',
      title: 'bg2',
      text: 'regarde ça bg',
      img: '',
      date: Date.parse('06/18/1997'),
      checked: ''
    },
    {
      category: 'LIFESTYLE/EXTRA',
      title: 'bg3',
      text: 'regarde ça bg',
      img: '',
      date: Date.parse('06/21/1997'),
      checked: ''
    },
    {
      category: 'LIFESTYLE/EXTRA',
      title: 'bg4',
      text: 'regarde ça bg',
      img: '',
      date: Date.parse('06/19/1997'),
      checked: ''
    }
  ];

  constructor() { }
  getStories() {
    return this.stories;
  }
  public getSportStories() {
    const array = [];
    this.stories.map(story => story.category === 'SPORTS' ? array.push(story) : console.log());
    array.sort(function(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    let i;
    for (i = 0; i < 3; i++) {
      array[i].checked = 'true';
    }
    return array;
  }

  getEntertainmentStories() {
    const array = [];
    this.stories.map(story => story.category === 'ENTERTAINMENT' ? array.push(story) : console.log());
    array.sort(function(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    let i;
    for (i = 0; i < 3; i++) {
      array[i].checked = 'true';
    }
    return array;
  }

  getLifestyleExtraStories() {
    const array = [];
    this.stories.map(story => story.category === 'LIFESTYLE/EXTRA' ? array.push(story) : console.log());
    array.sort(function(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    let i;
    for (i = 0; i < 3; i++) {
      array[i].checked = 'true';
    }
    return array;
  }
}
