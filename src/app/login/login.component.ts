import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formLogin!:FormGroup;

  constructor(private fb:FormBuilder,private authService: AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }

  handleLogin() {
   this.authService.login(this.formLogin.value.username,this.formLogin.value.password).subscribe({
     next:value=>{
       console.log(value)
       this.authService.loadProfile(value);
       this.router.navigateByUrl("/admin")
     },
     error:err => {
       console.log(err)
     }
   })  }
}
