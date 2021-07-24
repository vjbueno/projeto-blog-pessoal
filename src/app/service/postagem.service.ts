import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  //importando métodos http para que fiquem disponíveis
  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  //método busca todas as postagens
  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('http://localhost:8090/postagens', this.token)

  }

  //método busca postagem pelo id do post
  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`http://localhost:8090/postagens${id}`, this.token)
  }

  //método para publicar postagem
  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8090/postagens', postagem, this.token)
  }

  //método para atualizar um post
  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('http://localhost:8090/postagens', postagem, this.token)
  }

  //método deleta postagem
  deletePostagem(id: number){
    return this.http.delete(`http://localhost:8090/postagens${id}`, this.token)
  }
  
}
