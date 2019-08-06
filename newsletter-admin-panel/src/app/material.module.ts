
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatBadgeModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatTabsModule,
  MatSidenavModule, MatStepperModule,
} from '@angular/material';

const arrayModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatBadgeModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatTabsModule,
  MatSidenavModule,
  MatStepperModule,
];

@NgModule({
  imports: arrayModules,
  exports: arrayModules
})

export class MaterialModule { }
