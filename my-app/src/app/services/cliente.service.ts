import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'https://localhost:7101/api/Cliente/Cadastrar';

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Cliente[]> {   

    this.url = 'https://localhost:7101/api/Cliente';
    console.log('this.url');
    console.log(this.url);
    return this.http.get<Cliente[]>(this.url);
  }

  PegarPeloId(clienteid: number): Observable<Cliente> {
    console.log('pegar ii id');
    
      const apiUrl = `${this.url}/${clienteid}`;
      console.log(apiUrl);
      console.log(clienteid);  
      return this.http.get<Cliente>(apiUrl);
    }
  
    SalvarPessoa(cliente: Cliente): Observable<any> {
      console.log('this.SalvarPessoa');
      this.url = 'https://localhost:7101/api/Cliente/Cadastrar';
      console.log(this.url);
      return this.http.post<Cliente>(this.url, cliente, httpOptions);
    }
  
    AtualizarPessoa(cliente: Cliente): Observable<any> {
      console.log('this.url');
      console.log(this.url);
      return this.http.put<Cliente>(this.url, cliente, httpOptions);
    }
  
    ExcluirPessoa(clienteid: number): Observable<any> {
      this.url = 'https://localhost:7101/api/cliente';
      const apiUrl = `${this.url}/${clienteid}`;
      console.log('this.apiUrl');
      console.log(apiUrl);

      return this.http.delete<number>(apiUrl, httpOptions);
    }

}
