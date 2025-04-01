import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filial } from '../Filial';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  url = 'https://localhost:7101/api/filial/Cadastrar';
  
  constructor(private http: HttpClient) {}

   PegarTodos(): Observable<Filial[]> {
    
      this.url = 'https://localhost:7101/api/filial';
      console.log(this.url);

      return this.http.get<Filial[]>(this.url);
    }

    PegarPeloId(filialid: number): Observable<Filial> {
      console.log('pegar ii id');
      
        const apiUrl = `${this.url}/${filialid}`;
        console.log(apiUrl);
        console.log(filialid);  
        return this.http.get<Filial>(apiUrl);
      }
    
      SalvarFilial(filial: Filial): Observable<any> {
        
        this.url = 'https://localhost:7101/api/filial/Cadastrar';
        
        
        console.log('this.url');
        console.log(this.url);       

        return this.http.post<Filial>(this.url, filial, httpOptions);

      }
    
      AtualizarPessoa(filial: Filial): Observable<any> {
        console.log('this.url');
        console.log(this.url);
        return this.http.put<Filial>(this.url, filial, httpOptions);
      }
    
      ExcluirPessoa(filialid: number): Observable<any> {
        const apiUrl = `${this.url}/${filialid}`;
        return this.http.delete<number>(apiUrl, httpOptions);
      }
}
