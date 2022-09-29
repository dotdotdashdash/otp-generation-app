import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";

const MaterialComponents = [
  MatButtonModule,
  MatSliderModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatIconModule
]

@NgModule({
  imports: [ MaterialComponents ],
  exports: [ MaterialComponents ]
})
export class MaterialModule { }
