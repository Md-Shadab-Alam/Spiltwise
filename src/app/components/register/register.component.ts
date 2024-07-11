import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  repeatPass: string = 'none';
  registerDetails: Register = {
    Username: '',
    Name: '',
    Password: '',
    Role: ''
  }
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {}
  registerForm = new FormGroup({
    name: new FormControl("", [
      // Validators.required,
      // Validators.minLength(2),Validators.pattern("[a-zA-Z].*")
    ]),
    username: new FormControl("", [
      // Validators.required,
      // Validators.minLength(2),Validators.email
    ]),
    password: new FormControl("", [
      // Validators.required,
      // Validators.minLength(6),
      // Validators.maxLength(15)
    ]),
    confirmpassword: new FormControl(""),
    phoneno: new FormControl("", [
      // Validators.required,Validators.minLength(10),
      // Validators.maxLength(10)
    ])
  });
  onSubmit() {
    if (this.Password.value == this.ConfirmPassword.value) {
      // console.log(this.registerForm.valid);
      this.repeatPass = 'none';

      this.authService.registerUser(this.registerDetails).subscribe((res: any) => {
        // console.log(res);
        if (res.IsSuccess == false)
          alert(res.Message);
        else {
          alert(res.Message);
          this.router.navigateByUrl("login");
        }
      })
    } 
    else 
    {
      this.repeatPass = 'inline'
    }
  }
  get Name(): FormControl {
    return this.registerForm.get("name") as FormControl;
  }
  get Username(): FormControl {
    return this.registerForm.get("username") as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }
  get ConfirmPassword(): FormControl {
    return this.registerForm.get("confirmpassword") as FormControl;
  }
}
