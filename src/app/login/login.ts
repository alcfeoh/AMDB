
import { Component } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    MatButton
  ],
  styleUrl: './login.scss'
})
export class LoginComponent {

}

