import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from './Pessoa';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  url = 'https://localhost:7101/api/pessoa';

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }

  PegarPeloId(pessoaid: number): Observable<Pessoa> {
    const apiUrl = `${this.url}/${pessoaid}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  SalvarPessoa(pessoa: Pessoa): Observable<any> {
    console.log('this.url');
    console.log(this.url);
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  AtualizarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }

  ExcluirPessoa(pessoaId: number): Observable<any> {
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }

}
