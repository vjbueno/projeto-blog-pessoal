import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    //se o token estiver vazio
    if (environment.token == ''){
      /*mostre este alert na página para o usuário. FEATURE
      alert("Sessão expirada, logue novamente") */
      this.router.navigate(['/login'])
    }
  }

}
