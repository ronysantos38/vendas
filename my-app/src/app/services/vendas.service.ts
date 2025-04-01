import { Observable } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { VendaGerada } from '../model/VendaGerada';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VendaListada } from '../model/VendaListada';
import { VendaGeradaInput } from '../model/VendaGeradaInput';
import { VendaListadaGeral } from '../model/VendaListadaGeral ';
import { VendaEfetuada } from '../model/VendaEfetuada';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})


export class VendasService {

  //vendaGerada!: VendaGerada;

  vendaGeradaInput!: VendaGeradaInput;
  atualizado = new EventEmitter<boolean>();

    url = 'https://localhost:7101/api/venda';
    
    constructor(private http: HttpClient) {}
  
     PegarTodos(): Observable<VendaGerada[]> {
     
      this.url = 'https://localhost:7101/api/venda';
        return this.http.get<VendaGerada[]>(this.url);
      }

      ListarTipVenda(pTipo: string): Observable<VendaGerada[]> {
     
        this.url = 'https://localhost:7101/api/venda/TipoVenda';
        const apiUrl = `${this.url}/${pTipo}`;
        console.log(apiUrl);
        console.log(pTipo); 
        return this.http.get<VendaGerada[]>(apiUrl);
      }


      CancelarEnda(vendaid: number): Observable<any> {
        console.log('atualizar');
        this.url = 'https://localhost:7101/api/venda/CancelarVenda';
        const apiUrl = `${this.url}/${vendaid}`;
        console.log('this.url');
        console.log(this.url);
        return this.http.put<VendaGerada>(apiUrl, vendaid, httpOptions);
      }

      ModificarVendaRealizada(vendaEfetuada: VendaEfetuada): Observable<any> {
        console.log('this.url');
        console.log(vendaEfetuada);
        
        this.url = 'https://localhost:7101/api/venda/ModificarVenda';
        console.log(this.url);
        return this.http.put<VendaEfetuada>(this.url, vendaEfetuada!, httpOptions);
      }


      ListarVenda(): Observable<VendaListada[]> {
     
        this.url = 'https://localhost:7101/api/venda/ListarVenda';
          return this.http.get<VendaListada[]>(this.url);
        }
  
      PegarPeloId(vendaid: number): Observable<VendaGerada[]> {
        console.log('pegar ii id');

           this.url = 'https://localhost:7101/api/venda/RetornaVendaRealizada';
        
          const apiUrl = `${this.url}/${vendaid}`;
          console.log(apiUrl);
          console.log(vendaid);  
          return this.http.get<VendaGerada[]>(apiUrl);
        }    
        
        SalvarVendaRealizada(vendaEfetuada: VendaEfetuada[]): Observable<any> {
          console.log('this.url');
          console.log(vendaEfetuada);
          
          this.url = 'https://localhost:7101/api/venda/GerarVenda';
          console.log(this.url);
          return this.http.post<VendaEfetuada>(this.url, vendaEfetuada!, httpOptions);
        }
      

        EditarVendaRealizada(vendaEfetuada: VendaEfetuada): Observable<any> {
          console.log('this.url');
          console.log(vendaEfetuada);
          
          this.url = 'https://localhost:7101/api/venda/GerarVenda';
          console.log(this.url);
          return this.http.post<VendaEfetuada>(this.url, vendaEfetuada!, httpOptions);
        }
      

       /* AtualizarPessoa(produto: VendaGerada): Observable<any> {
          console.log('atualizar');
          console.log('this.url');
          console.log(this.url);
          return this.http.put<VendaGerada>(this.url, produto, httpOptions);
        }*/
      
        ExcluirPessoa(produtoid: number): Observable<any> {
          const apiUrl = `${this.url}/${produtoid}`;
          return this.http.delete<number>(apiUrl, httpOptions);
        }



        ItemVendaRealizada(vendaid: number,produtoid: number): Observable<VendaListadaGeral> {
          console.log('pegar ii id');
  
             this.url = 'https://localhost:7101/api/venda/RetornaVendaRealizadaItem';
          
            const apiUrl = `${this.url}/${vendaid}/${produtoid}`;
            console.log(apiUrl);
            console.log(vendaid);  
            return this.http.get<VendaListadaGeral>(apiUrl);
          }    

}
