import { Filial } from '../../Filial';
import { Produto } from '../../Produto';
import { DatePipe } from '@angular/common';
import { formatDate } from "@angular/common"; 
import { Cliente } from '../../model/Cliente';
import { MatTable } from '@angular/material/table';
import { VendaGerada } from '../../model/VendaGerada';
import { FormControl, FormGroup } from '@angular/forms';
import {  VendaEfetuada } from '../../model/VendaEfetuada';
import { ProdutoFilial } from '../../model/ProdutoFilial';
import { VendaFaturada } from '../../model/VendaFaturada';
import {ChangeDetectionStrategy,  signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FilialService } from '../../services/filial.service';
import { VendasService } from '../../services/vendas.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  id: number;
  produto: string;
  filial: string;
  valor: number;
  quantidade: number;
  desconto: number;
  produto_id: number;
  clienteid: number;     
  dataVenda: Date;
  total: number;     
}


@Component({
  selector: 'app-vendas',
  standalone: false,
  
  templateUrl: './vendas.component.html',
  styleUrl: './vendas.component.css'
})
export class VendasComponent implements OnInit {


  ELEMENT_DATA: PeriodicElement[] = [];
  formulario: any;
  tituloFormulario!: string; 
  nomeProduto!: string;
  vendaGerada!: VendaGerada[];
  produtoid!: number;
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;     
  modalRef: BsModalRef | undefined;  

   clientes!: Cliente[];
   cliente!: Cliente;

   produtos!: Produto[];
   produtosFilial!: ProdutoFilial[];
   vendaRealizada!: VendaEfetuada[];
   testeRealizada!: VendaEfetuada;

   filial_id!: number;
   produto_id!: number;
   cliente_id!: number;
   ltsVendaGerada!: VendaGerada[];
   ltsVendaFaturada!: VendaFaturada[];
   
   @ViewChild(MatTable)
   table!: MatTable<any>;
   
   displayedColumns: string[] = ['produto','filial','valor','quantidade','desconto','total','acoes'];
   dataSource = this.ELEMENT_DATA;

   id!: number ;
   panelOpenState = false;

   vendaGerada2!: VendaGerada[];
   vendaGerada3!: VendaGerada[];
   vData!: Date;
   vDataS?: string; 
   vSoma!: number;
   filiais!: Filial[];
   filial_id1!: number;
   formatdate = 'dd/MM/yyyy';

   constructor(
          private  filialService: FilialService,
          private  vendasService: VendasService,
          private  clienteService: ClienteService,
          private  produtoService: ProdutoService,   
          public dialog: MatDialog,       
        //  private  filialService : FilialService,
          private modalService: BsModalService
        ) {}
 
 
 
  ngOnInit(): void {
   
    this.id = 0;

    this.vendasService.PegarTodos().subscribe((resultado) => {
      this.vendaGerada  = resultado;
      console.log('produtosFilial');
      console.log(this.vendaGerada);
      
      this.filialService.PegarTodos().subscribe((resul) => {
        this.filiais  = resul;
        console.log('this.filiais');
        console.log(this.filiais);
      });

      /*
      this.vendaGerada2 = [...new Set(this.vendaGerada.map(item => item.vendaid))];
      console.log('unique');
        console.log(this.vendaGerada2);
*/

        const key = 'vendaid';

        this.vendaGerada2  = [...new Map(this.vendaGerada.map(item =>
          [item[key], item])).values()];

          console.log('unique');
          console.log(this.vendaGerada2 );


          this.geratotal();
        }); 



       // this.geratotal();
      

  }

 
geratotal(): void{
 
 
  this.vendaGerada3 = [];   
 
  // debugger;
  console.log('ssss');
  console.log(this.vendaGerada2.length);
  for(var i  = 0; i < this.vendaGerada2.length; i++)
    {
     this.vSoma = 0;
     console.log('aqui');

    // console.log(this.vendaGerada.length);
     for(var x  = 0; x < this.vendaGerada.length; x++)
     {
         if( this.vendaGerada[x].vendaid ==  this.vendaGerada2[i].vendaid )
            {
              this.vSoma = this.vSoma  + this.vendaGerada[x].total;
             // this.vendaGerada2[x].total = this.vSoma ;
            }
      }
      console.log('soma');
      console.log(this.vSoma);
     

      console.log('this.vendaGerada2[i]');
      console.log(this.vendaGerada2[i]);

      this.vendaGerada3.push({
        clienteid: this.vendaGerada[i].clienteid,
        vendaid: this.vendaGerada2[i].vendaid,
        produtoid: this.vendaGerada2[i].produtoid,
        filialid: this.vendaGerada2[i].filialid,
        nomeCliente: this.vendaGerada2[i].nomeCliente,      
        nomeProduto: this.vendaGerada2[i].nomeProduto,      
        nomeFilial:  this.vendaGerada2[i].nomeFilial,  
        dataVenda: new Date( this.vendaGerada2[i].dataVenda), 
        valor:this.vendaGerada2[i].valor,
        desconto:this.vendaGerada2[i].desconto,
        qtde:this.vendaGerada2[i].qtde,
        total:this.vSoma
       });

    }  

    console.log('vendaGerada3');
    console.log(this.vendaGerada3);
}

  ExibirFormularioCadastro(): void {

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Venda';

    const data1 = new Date(); 
    const formattedDate = data1.toLocaleString();
  
    const dataFormat =   formattedDate.substring(0, 10); 
    console.log(dataFormat);

     this.formulario = new FormGroup({
          nome: new FormControl(null),    
          valor: new FormControl(0),   
          desconto: new FormControl(0),    
          quantidade: new FormControl(1),   
          dataVenda: new FormControl(dataFormat),   
        });
        
        this.AtualizaCombo();

        //this.formulario.dataVenda =new Date();
  }

  AtualizaCombo(): void{
    this.clienteService.PegarTodos().subscribe((resultado) => {
      this.clientes  = resultado;
      console.log('this.pessoas');
      console.log(this.clientes);
    });
  
    this.produtoService.PegarTodos().subscribe((resultado) => {
      this.produtosFilial  = resultado;
      console.log('produtosFilial 1');
      console.log(this.produtosFilial);
    }); 
  }

  ExibirFormularioAtualizacao(produtoid: any): void {}

  Voltar(): void {

    console.log("escolhido")    

    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }
  
  IncluirVenda(): void {     
  
    const vendaFat: VendaFaturada = this.formulario.value;     

    const produtos1 = this.produtosFilial.filter(x => x.produtoid == this.produto_id) ;
    console.log('vendaFat') ;
    console.log(vendaFat) ;
    console.log(produtos1[0].nomeFilial);  

     

    this.id = this.id +1;

  //const datepipe: DatePipe = new DatePipe('pt-BR');
    
 // let formattedDate = datepipe.transform(vendaFat.dataVenda, 'MMM/dd/YYYY')

 // console.log('formattedDate');
  //debugger;
  //this.formatoData( new Date(vendaFat.dataVenda));

  /****Regra da venda */ 
  
  /* 
   Compras acima de 4 itens idênticos têm 10% de desconto
  * Compras entre 10 e 20 itens idênticos têm 20% de desconto
  * Não é possível vender acima de 20 itens idênticos
  * Compras abaixo de 4 itens não podem ter desconto  */

 if(vendaFat.quantidade < 4){
    vendaFat.desconto = 0;
   }
   
 if(vendaFat.quantidade >4){
  vendaFat.desconto = (0.10 * vendaFat.valor);;
 }

 if(vendaFat.quantidade >= 10 && vendaFat.quantidade <= 20){
  
  vendaFat.desconto = (0.20 * vendaFat.valor);
 }

 if(vendaFat.quantidade > 20){
  alert('não e possivel vender mais que 20 produtos');
  return;
 }

 console.log('FORMULARIO');
 console.log(vendaFat);
 console.log(vendaFat.dataVenda.toString());

 console.log('FORMULAwewewewRIO');

  let formattedDate = this.formatarDataNew(vendaFat.dataVenda.toString());

  console.log(formattedDate);
 
    this.ELEMENT_DATA.push({
      id:  this.id,
      produto: produtos1[0].nomeProduto,
      filial: produtos1[0].nomeFilial,
      valor: vendaFat.valor,
      quantidade: vendaFat.quantidade,
      desconto: vendaFat.desconto,
      produto_id: this.produto_id,
      clienteid: this.cliente_id,
      dataVenda: new Date(formattedDate),
      total: (vendaFat.quantidade * vendaFat.valor) - vendaFat.desconto
    });


    console.log('ELEMENT_DATA') ;
    console.log(this.ELEMENT_DATA) ;

    this.table.renderRows();
  }

/*
  function formatDat1e(date1: Date): Date { 
    return date1.toISOString().replace('T', ' ').replaceAll('-', '/').substring(0, 19);
   }
*/



  EnviarFormulario(): void {

    console.log('EnviarFormulario');

    const vendaFat: VendaFaturada = this.formulario.value;

    console.log(vendaFat);

    console.log(this.ELEMENT_DATA);

    this.vendaRealizada = [];   

    console.log('this.filial_id1');
    console.log(this.filial_id1);


    const datepipe: DatePipe = new DatePipe('en-US');
   

    //const datepipe: DatePipe = new DatePipe('pt-BR');
    
  //  let formattedDate = datepipe.transform(yourDate, 'dd-MMM-YYYY HH:mm:ss')



    for(var x=0;x< this.ELEMENT_DATA.length;x++){

      
      //this.vDataS =  datepipe.transform((this.ELEMENT_DATA[x].dataVenda.toDateString()), 'dd-MMM-YYYY HH:mm:ss')?.toString();


       //this.vData = new Date.parse(this.vDataS);


      //this.vData = new Date( Date.parse(this.vDataS));


      //const formattedDate = data1.toLocaleString();

       this.vendaRealizada.push({
            vendaefetuadaid: 0,
            clienteid : this.ELEMENT_DATA[x].clienteid,
            vendaid   : 1,
            produtoid : Number(this.ELEMENT_DATA[x].produto_id),            
            dataVenda : new Date(this.ELEMENT_DATA[x].dataVenda),
            valor     : Number(this.ELEMENT_DATA[x].valor),           
            desconto  : Number(this.ELEMENT_DATA[x].desconto),
            qtde      : Number(this.ELEMENT_DATA[x].quantidade),
            filialid  : this.filial_id1
       })     
     
    }

    console.log('aquixxxxxxxxxxxxxxxxx');
    console.log(this.vendaRealizada);   
 
//  console.log(user);

    console.log('this.vendaRealizadaxxxxxxxxxxxxxxxxxx');
    console.log(this.vendaRealizada);

    this.vendasService.SalvarVendaRealizada(this.vendaRealizada).subscribe((resultado) => {
      console.log('this.vendaRealizada');
      console.log(this.vendaRealizada);
      this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      
      this.ShowMensagem('Venda', 'Incluida com Sucesso', 'close');
      this.vendasService.PegarTodos().subscribe((registros) => {
        this.produtosFilial = registros;
      });
    });

  }

ShowMensagem(titulo: string, msg: string, tipoMesagem: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '400px',
      data: { title: titulo, nome: msg, tipoMesagem }
    });
  }

  ExibirConfirmacaoExclusao(produtoid :number, nomeFilial: string, conteudoModal: TemplateRef<any>): void {}

  ExcluirPessoa(produtoid : number){}

  ExcluirVenda(id1: number): void {
    console.log('id1');
    console.log(id1);

   // const index = ELEMENT_DATA.filter(x =>x.id == id1);
   // ELEMENT_DATA.splice(index, 1);

  /*  const index = ELEMENT_DATA.filter(x =>x.id == id1);
    console.log('ELEMENssT_DATA');
      console.log(index );
*/
  //  ELEMENT_DATA.pop();

      //delete this.vELEMENT_DATA[this.vELEMENT_DATA.findIndex(x =>x.id == id1)];

    // delete this.ELEMENT_DATA[this.ELEMENT_DATA.findIndex(x =>x.id == id1)];


    let index = this.ELEMENT_DATA.findIndex(d => d.id === id1); //find index in your array
    this.ELEMENT_DATA.splice(index, 1);//remove element from arra


      ///delete this.items[this.items.findIndex(item => item.item_id == item_id)];

      console.log('ELEMENT_DATA');
      console.log(this.ELEMENT_DATA);
    
      this.table.renderRows();

    /**
     * 
     *  let index = this.documents.findIndex(d => d.id === id); //find index in your array
        this.documents.splice(index, 1);//remove element from array
     * 
     */
    /// const produtos1 = this.produtosFilial.filter(x => x.produtoid == this.produto_id) ;
  }

  toggleSelection(user: Filial) {
    console.log('user');
   console.log(user);

  }

   
  formatarDataNew(myDate : string ) : string{
    const dataFormat = myDate.substring(3, 6) +  myDate.substring(0, 2) +  myDate.substring(5);
    return  dataFormat;
    
    //console.log('formattedDate');
    //console.log(dataFormat);
  }
   
 
  valorProduto(produtoid: number): void {

    console.log('this.produtosFilial 2');
    console.log(this.produtosFilial);

    const data1 = new Date(); 
    const formattedDate = data1.toLocaleString();
  
    const dataFormat =   formattedDate.substring(0, 10); 
    console.log(dataFormat);


    const produtos1 = this.produtosFilial.filter(x => x.produtoid == produtoid) ;

    console.log('produtos1');
    console.log(produtos1);

    this.formulario = new FormGroup({       
      valor: new FormControl(produtos1[0].valor),
      desconto: new FormControl(0),    
      quantidade: new FormControl(1),   
      dataVenda: new FormControl(dataFormat),
    }); 
  }



  
}
 
