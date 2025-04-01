import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../Produto';
import { ProdutoFilial } from '../model/ProdutoFilial';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})


export class ProdutoService {

  url = 'https://localhost:7101/api/produto';
    
    constructor(private http: HttpClient) {}
  
     PegarTodos(): Observable<ProdutoFilial[]> {
      
       this.url = 'https://localhost:7101/api/produto/ListarProdutos';
  
        return this.http.get<ProdutoFilial[]>(this.url);
      }
  

      PegarProdutoFilial(filialid: number): Observable<Produto[]> {
      
          this.url = 'https://localhost:7101/api/produto/CarregarFilial';
          const apiUrl = `${this.url}/${filialid}`;
          console.log('apiUrl');
          console.log(apiUrl);
           return this.http.get<Produto[]>(apiUrl);
         }


      PegarPeloId(produtoid: number): Observable<ProdutoFilial> {
        console.log('pegar ii id');
        
          this.url = 'https://localhost:7101/api/produto';
          const apiUrl = `${this.url}/${produtoid}`;
          console.log(apiUrl);
          console.log(produtoid);  
          return this.http.get<ProdutoFilial>(apiUrl);
        }    
        
        SalvarPessoa(produto: Produto): Observable<any> {
          console.log('this.url');
          this.url = 'https://localhost:7101/api/produto/Cadastrar';
          console.log(this.url);
          return this.http.post<Produto>(this.url, produto, httpOptions);
        }
      
        AtualizarPessoa(produto: Produto): Observable<any> {
          console.log('atualizar');
          console.log('this.url');
          console.log(this.url);
          return this.http.put<Produto>(this.url, produto, httpOptions);
        }
      
        ExcluirPessoa(produtoid: number): Observable<any> {
          this.url = 'https://localhost:7101/api/produto';
          const apiUrl = `${this.url}/${produtoid}`;
          console.log('this.apiUrl');
          console.log(apiUrl);
          
          return this.http.delete<number>(apiUrl, httpOptions);
        }
}
