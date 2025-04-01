
import { Cliente } from '../../model/Cliente';
import { VendaGerada } from '../../model/VendaGerada';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VendasService } from '../../services/vendas.service';
import { ClienteService } from '../../services/cliente.service';
import { AfterViewInit,  Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-venda-cliente',
  standalone: false,
  
  templateUrl: './venda-cliente.component.html',
  styleUrl: './venda-cliente.component.css'
})


export class VendaClienteComponent  implements OnInit{

regForm1!: FormGroup;
clientes!: Cliente[];
cliente_id!: number;
vendaGerada!: VendaGerada[];

displayedColumns: string[] = ['produto','filial','valor','data','nome','quantidade','desconto','total','acoes'];


dsVendaFilial    = new MatTableDataSource<VendaGerada>();
@ViewChild(MatPaginator) paginator!: MatPaginator  ;

constructor(      
  public dialog: MatDialog,
  private formBuilder: FormBuilder,
  private clienteService : ClienteService,
  private vendasService: VendasService) {

    this.regForm1 = formBuilder.group({});
  }


  ngOnInit(): void {
    console.log('Solicitada nova transferência');
 

    this.clienteService.PegarTodos().subscribe((resultado) => {
      this.clientes  = resultado;
      console.log('this.pessoas');
      console.log(this.clientes);
    });


    this.vendasService.PegarTodos().subscribe((resultado) => {
      this.vendaGerada  = resultado;
      console.log('produtosFilial');
      console.log(this.vendaGerada);

      this.dsVendaFilial = new MatTableDataSource(this.vendaGerada);

      console.log('ngOnInit');
      this.dsVendaFilial.paginator = this.paginator;

    });

  }

  
  selecionaFilial(filialid :number) {
    console.log('selecionaFilial');
   console.log(filialid);

   if(filialid == 0)
    this.dsVendaFilial = new MatTableDataSource(this.vendaGerada);
  else
   this.dsVendaFilial = new MatTableDataSource(this.vendaGerada.filter(x => x.clienteid == filialid));



   this.dsVendaFilial.paginator = this.paginator; // For pagination
  }


  ngAfterViewInit(): void {
    console.log('passou aqui1');
    this.dsVendaFilial.paginator = this.paginator; // For pagination
  } 

}
