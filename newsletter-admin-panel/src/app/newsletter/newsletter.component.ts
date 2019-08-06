import {Component, OnInit} from '@angular/core';
import {NewsletterApiService} from '../services/newsletter-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsletterForm: FormGroup;
  storiesByCategory: object = {};
  nextNewsletter: Date;
  readonly categories = ['sports', 'entertainment', 'lifestyle'];
  readonly nbSendedByArticle = 3;
  readonly topStoriesText = 'topstories';
  readonly tltsText = 'tlts';
  send: object = {};
  isOnSubmit = false;

  constructor(
    public newsletterApiService: NewsletterApiService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
  }

  ngOnInit() {
    const qTab = [];
    this.initSend();
    this.newsletterApiService.getNextNewsletterDate().subscribe(date => {
      this.nextNewsletter = new Date(date.toString());
    });
    this.categories.forEach(category => {
      qTab.push(new Promise(resolve => {
        this.newsletterApiService.getStoriesByCategory(category).subscribe(arrayStories => {
          this.storiesByCategory[category] = arrayStories;
          resolve(arrayStories);
        });
      }));
    });
    Promise.all(qTab).then(() => {
      const tmpControls = {};
      for (const cat of this.categories) {
        this.storiesByCategory[cat].forEach((value, index) => {
          if (index < 3) {
            tmpControls[index] = [''];
          } else {
            tmpControls[index] = [''];
          }
        });
      }
      this.newsletterForm = this.formBuilder.group({
        sports: this.formBuilder.group(tmpControls),
        entertainment: this.formBuilder.group(tmpControls),
        lifestyle: this.formBuilder.group(tmpControls)
      });
    });
  }

  onSubmit() {
    this.isOnSubmit = true;
    const result = this.newsletterForm.value;
    let valid = true;
    let cpt = 0;
    let element;
    this.initSend();
    Object.keys(result).forEach(k => {
      cpt = 0;
      Object.keys(result[k]).forEach(i => {
        // console.log(result[k][i]);
        if (result[k][i] === true) {
          this.send[k].push(this.storiesByCategory[k][i]);
          cpt++;
        }
      });
      if (cpt !== this.nbSendedByArticle) {
        valid = false;
      }
      cpt = 0;
    });
    if (!valid) {
      this.alertService.clear();
      this.alertService.error(this.nbSendedByArticle + ' stories by category needs to be chosen');
      this.initSend();
      setTimeout(() => {
        element = document.querySelector('#scrollId');
        element.scrollIntoView();
        this.isOnSubmit = false;
      });
    } else {
      this.newsletterApiService.sendStories(this.send).subscribe((success) => {
        this.alertService.success('The newsletter has been sent ');
        setTimeout(() => {
          element = document.querySelector('#scrollId');
          element.scrollIntoView();
          this.isOnSubmit = false;
        });
      }, (error) => {
        this.alertService.error('Error: ' + error);
        setTimeout(() => {
          element = document.querySelector('#scrollId');
          element.scrollIntoView();
          this.isOnSubmit = false;
        });
      });
    }
  }
  initSend() {
    this.categories.forEach(v => {
      this.send[v] = [];
    });
    this.send[this.tltsText] = [];
    this.send[this.topStoriesText] = [];
  }
}
