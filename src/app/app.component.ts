import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'digitalBank-angular-front';
constructor(private autService:AuthService) {
}
  ngOnInit(): void {
  this.autService.loadJwtTokenFromLocalStorage()

  }


}
