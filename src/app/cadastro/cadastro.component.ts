import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //variaveis/objetos:
  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  //quando minha página iniciar faça:
  ngOnInit() {
    window.scroll(0,0)

  }

  //método de confirmar senha:
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value


  }

  cadastrar(){
    this.user.tipoUsuario = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      alert("As senhas não estão iguais")
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/login'])
        alert("Usuário cadastrado com sucesso!")
      })

    }

  }

}
