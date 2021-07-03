import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  private http: HttpClient
  ) { }


  //método entrar
  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>("https://blogbuenovj.herokuapp.com/usuarios/logar", userLogin)

  }

  //método cadastrar
  cadastrar(user: User): Observable<User> {
    return this.http.post<User>("https://blogbuenovj.herokuapp.com/usuarios/cadastrar", user)

  }

  //método logado
  logado(){

    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok

  }
}
