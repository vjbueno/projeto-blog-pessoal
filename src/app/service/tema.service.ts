import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  //importando métodos http para que fiquem disponíveis
  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  //método GET que busca todos os temas
  getAllTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://blogbuenovj.herokuapp.com/tema', this.token)
  }

  //método POST inclui um tema no objeto tema 
  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://blogbuenovj.herokuapp.com/tema', tema, this.token)

  }

}
