
import { Filial } from '../../Filial';
//import { MatDialogRef} from '@angular/material';
import { VendaGerada } from '../../model/VendaGerada';
import {  MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'; 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
//import { MatPaginator } from '@angular/material/paginator';
import { FilialService } from '../../services/filial.service';
import { VendasService } from '../../services/vendas.service';
import { AfterViewInit,  Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-venda-filial',
  standalone: false,
  
  templateUrl: './venda-filial.component.html',
  styleUrl: './venda-filial.component.css'
})

export class VendaFilialComponent  implements OnInit{

regForm1!: FormGroup;
filiais!: Filial[];
filial_id!: number;
vendaGerada!: VendaGerada[];

displayedColumns: string[] = ['produto','filial','valor','data','nome','quantidade','desconto','total','acoes'];


dsVendaFilial    = new MatTableDataSource<VendaGerada>();
@ViewChild(MatPaginator) paginator!: MatPaginator  ;


     constructor(      
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private filialService: FilialService,
        private vendasService: VendasService) {

          this.regForm1 = formBuilder.group({});
        }
  
  
  ngOnInit(): void {
    console.log('Solicitada nova transferência');

    this.filialService.PegarTodos().subscribe((resultado) => {
      this.filiais  = resultado;
      console.log('this.pessoas');
      console.log(this.filiais);
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
   this.dsVendaFilial = new MatTableDataSource(this.vendaGerada.filter(x => x.filialid == filialid));



   this.dsVendaFilial.paginator = this.paginator; // For pagination
  }


  ngAfterViewInit(): void {
    console.log('passou aqui1');
    this.dsVendaFilial.paginator = this.paginator; // For pagination
  } 


}
