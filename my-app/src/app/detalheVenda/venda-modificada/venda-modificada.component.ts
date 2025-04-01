import { VendaGerada } from '../../model/VendaGerada';
import { MatPaginator } from '@angular/material/paginator';
import { ProdutoFilial } from '../../model/ProdutoFilial';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VendasService } from '../../services/vendas.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { AfterViewInit,  Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-venda-modificada',
  standalone: false,
  
 templateUrl: './venda-modificada.component.html',
  styleUrl: './venda-modificada.component.css'
})


export class VendaModificadaComponent {

  regForm1!: FormGroup; 
  produto_id!: number;
  vendaGerada!: VendaGerada[];
  produtosFilial!: ProdutoFilial[];

  displayedColumns: string[] = ['produto','filial','valor','data','nome','quantidade','desconto','total','acoes'];

  dsVendaFilial    = new MatTableDataSource<VendaGerada>();
  @ViewChild(MatPaginator) paginator!: MatPaginator  ;


  constructor(  
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private vendasService : VendasService,
    private produtoService: ProdutoService) {
  
      this.regForm1 = formBuilder.group({});
    }

    ngOnInit(): void {
      console.log('Solicitada nova transferência');
    /*
    
      this.produtoService.PegarTodos().subscribe((resultado) => {
        this.produtosFilial  = resultado;
        console.log('produtosFilial');
        console.log(this.produtosFilial);
      }); 
  */
  
      this.vendasService.ListarTipVenda('M').subscribe((resultado) => {
        this.vendaGerada  = resultado;
        console.log('produtosFilial');
        console.log(this.vendaGerada);
  
        this.dsVendaFilial = new MatTableDataSource(this.vendaGerada);
  
        console.log('ngOnInit');
        this.dsVendaFilial.paginator = this.paginator;
  
      });
  
    }

    ngAfterViewInit(): void {
      console.log('passou aqui1');
      this.dsVendaFilial.paginator = this.paginator; // For pagination
    } 

}
