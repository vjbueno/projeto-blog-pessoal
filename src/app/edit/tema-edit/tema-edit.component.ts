import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    
    //se o token estiver vazio
    if (environment.token == ''){
      /*mostre este alert na página para o usuário. FEATURE
      alert("Sessão expirada, logue novamente") */
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: Tema) =>{
      this.tema = resp
    })

  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess("Tema atualizado com sucesso!")
      this.router.navigate(['/tema'])

    })
  }

}
