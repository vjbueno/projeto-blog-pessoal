import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  user: User = new User()
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

     //se o token estiver vazio
     if (environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  //método de confirmar senha:
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value


  }

  atualizar(){
    this.user.tipoUsuario = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      alert("As senhas não estão iguais")
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/inicio'])
        alert("Usuário atualizado com sucesso! Faça o login novamente.")
        environment.token = ""
        environment.nome = ""
        environment.foto = ""
        environment.idUsuario = 0
        
        this.router.navigate(['/login'])
      })

    }

  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })

  }

}
