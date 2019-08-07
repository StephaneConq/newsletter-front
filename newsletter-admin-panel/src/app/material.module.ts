
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
  MatSidenavModule, MatStepperModule, MatDialogModule,
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
  MatDialogModule
];

@NgModule({
  imports: arrayModules,
  exports: arrayModules
})

export class MaterialModule { }
