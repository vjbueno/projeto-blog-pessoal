import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  //variavéis relacionadas postagem:
  postagem: Postagem = new Postagem() //<< instanciando na var objeto Postagem
  listaPostagens: Postagem[]
  


  //váriaveis relacionadas ao tema:
  tema: Tema = new Tema()
  listaTemas: Tema[] 
  idTema: number

  //váriaveis relacionadas ao usuario
  user: User = new User()
  idUser = environment.idUsuario

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alertas: AlertasService
    
  ) { }

  ngOnInit() {
    //se o token estiver vazio
    if (environment.token == ''){
      /*mostre este alert na página para o usuário. FEATURE
      alert("Sessão expirada, logue novamente") */
      this.router.navigate(['/login'])
    }
    this.getAllTemas()
    this.getAllPostagens()
    
  }

  //método para incluir tema já existente em uma postagem
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
    
  }


  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })

  }

  //método tras todas as postagem e mostra na tela de início:
  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp

    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })

  }
  
  //método publica um post
  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.idUsuario = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem publicada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })

  }

}
