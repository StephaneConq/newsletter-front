import { Component, OnInit } from '@angular/core';
import { NewsletterApiService} from '../services/newsletter-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsletterForm: FormGroup;
  storiesByCategory: object = {};
  //TODO Change politics into sports
  readonly categories = ['politics', 'entertainment', 'lifestyle'];

  constructor(
    public newsletterApiService: NewsletterApiService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const qTab = [];
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
    alert('TEST');
  }
}
