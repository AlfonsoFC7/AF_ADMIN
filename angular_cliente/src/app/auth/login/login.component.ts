import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteLogService } from 'src/app/services/cliente-log.service'; 
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    IdCli: [0, Validators.required ],
    CliName: ['', Validators.required ]
  });
  constructor( private router: Router,
    private fb: FormBuilder,
    private clienteLogService: ClienteLogService,
    private ngZone: NgZone ) { }

    ngOnInit(): void {
      this.renderButton();
    }

    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
      }); 
    }

    login() {
      const {IdCli}=this.loginForm.value;
      this.clienteLogService.login( this.loginForm.value )
        .subscribe( resp => {
          console.log(resp);  
          if(resp===true){
            this.router.navigateByUrl(`/car/${IdCli}`);
          }
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error' );
        });
  
    }
  
}
