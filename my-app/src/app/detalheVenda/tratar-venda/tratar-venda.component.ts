import { VendaGerada } from '../../model/VendaGerada';
import { VendaListada } from '../../model/VendaListada';
import { MatPaginator } from '@angular/material/paginator';
import { ProdutoFilial } from '../../model/ProdutoFilial';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { VendasService } from '../../services/vendas.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { AfterViewInit, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filial } from '../../Filial';
import { FilialService } from '../../services/filial.service';
import { Cliente } from '../../model/Cliente';
import { VendaFaturada } from '../../model/VendaFaturada';
import { DialogComponent } from '../../dialog/dialog.component';


export interface PeriodicElement {
  vendaid: number;
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



@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-tratar-venda',
  standalone: false,

  templateUrl: './tratar-venda.component.html',
  styleUrl: './tratar-venda.component.css'
})


export class TratarVendaComponent {

  regForm1!: FormGroup;
  produto_id!: number;
  //vendaGerada!: VendaGerada[];
  produtosFilial!: ProdutoFilial[];
  vendaListada!: VendaListada[];
  vendaListada2!: VendaListada[];

  displayedColumns: string[] = ['filial', 'nome', 'data', 'statusVenda', 'acoes'];


  tipoVenda!: string;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  vendaGerada2!: VendaGerada[];
  filiais!: Filial[];
  vendaGerada!: VendaGerada[];
  vendaGerada3!: VendaGerada[];
  DataS?: string;
  vSoma!: number;
  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns2: string[] = ['produto', 'filial', 'valor', 'quantidade', 'desconto', 'total', 'acoes'];

  dsDataSource = this.ELEMENT_DATA;

  vendaid!: number;

  filial_id!: number;
  //   produto_id!: number;
  cliente_id!: number;
  filial_id1!: number;
  clientes!: Cliente[];
  cliente!: Cliente;

  formulario: any;
  tituloFormulario!: string;
  nomeProduto!: string;
  vendaGeradaN!: VendaGerada[];

  dsVendaFilial = new MatTableDataSource<VendaListada>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @ViewChild(MatTable)
  table!: MatTable<any>;
  id!: number;

  @Input() formularioN!: number;


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private vendasService: VendasService,
    private filialService: FilialService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService) {

    this.regForm1 = formBuilder.group({});
  }

  ngOnInit(): void {

    this.ListarPrincipal();

  }


  ListarPrincipal(): void {

    console.log('passsei aui no onit');

    this.vendaListada2 = [];

    this.vendasService.ListarVenda().subscribe((resultado) => {
      this.vendaListada = resultado;


      for (var i = 0; i < this.vendaListada.length; i++) {

        if (this.vendaListada[i].statusVenda == "S") {
          this.tipoVenda = "OK"
        } else if (this.vendaListada[i].statusVenda == "M") {
          this.tipoVenda = "Modificada"
        } else if (this.vendaListada[i].statusVenda == "C") {
          this.tipoVenda = "Cancelada"
        }

        this.vendaListada2.push({
          vendaid: this.vendaListada[i].vendaid,
          clienteid: this.vendaListada[i].clienteid,
          filialid: this.vendaListada[i].filialid,
          nomeFilial: this.vendaListada[i].nomeFilial,
          nomeCliente: this.vendaListada[i].nomeCliente,
          statusVenda: this.tipoVenda,
          dataVenda: this.vendaListada[i].dataVenda
        })
      }


      this.dsVendaFilial = new MatTableDataSource(this.vendaListada2);


      this.dsVendaFilial.paginator = this.paginator;
    });

  }

  ngAfterViewInit(): void {
    console.log('passou ngAfterViewInit');
    this.dsVendaFilial.paginator = this.paginator; // For pagination
  }

  cancelarVenda(vendaid: any): void {

    this.vendasService.CancelarEnda(vendaid).subscribe((resultado) => {
      this.ShowMensagem('Venda', 'Venda Cancelada com Sucesso', 'close');
      this.ListarPrincipal();
    });
  }

  modificarVenda(vendaid: any, produtoid: any): void {

    this.ExibirFormularioCadastro(vendaid);
    //  this.ModificarVendaNew();
  }



  ModificarVendaNew(): void {

    this.vendasService.PegarTodos().subscribe((resultado) => {
      this.vendaGerada = resultado;

      this.filialService.PegarTodos().subscribe((resul) => {
        this.filiais = resul;

      });

      /*
      this.vendaGerada2 = [...new Set(this.vendaGerada.map(item => item.vendaid))];
      console.log('unique');
        console.log(this.vendaGerada2);
*/

      const key = 'vendaid';

      this.vendaGerada2 = [...new Map(this.vendaGerada.map(item =>
        [item[key], item])).values()];

      console.log('unique');
      console.log(this.vendaGerada2);


      this.geratotal();
    });



    // this.geratotal();


  }


  geratotal(): void {


    this.vendaGerada3 = [];

    // debugger;

    for (var i = 0; i < this.vendaGerada2.length; i++) {
      this.vSoma = 0;
      console.log('aqui');

      // console.log(this.vendaGerada.length);
      for (var x = 0; x < this.vendaGerada.length; x++) {
        if (this.vendaGerada[x].vendaid == this.vendaGerada2[i].vendaid) {
          this.vSoma = this.vSoma + this.vendaGerada[x].total;
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
        nomeFilial: this.vendaGerada2[i].nomeFilial,
        dataVenda: new Date(this.vendaGerada2[i].dataVenda),
        valor: this.vendaGerada2[i].valor,
        desconto: this.vendaGerada2[i].desconto,
        qtde: this.vendaGerada2[i].qtde,
        total: this.vSoma
      });

    }

    console.log('vendaGerada3');
    console.log(this.vendaGerada3);
  }


  EnviarFormulario(): void {
  }

  toggleSelection(user: Filial) {
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }



  ExibirFormularioCadastro(vendaid: any): void {

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Modificar Venda';

    const data1 = new Date();
    const formattedDate = data1.toLocaleString();

    const dataFormat = formattedDate.substring(0, 10);


    this.formulario = new FormGroup({
      nome: new FormControl(null),
      valor: new FormControl(0),
      desconto: new FormControl(0),
      quantidade: new FormControl(0),
      dataVenda: new FormControl(dataFormat),
    });


    this.vendasService.PegarPeloId(vendaid).subscribe((resultado) => {
      this.vendaGeradaN = resultado;
      console.log('vendaRealizada');
      console.log(this.vendaGeradaN);


      for (var i = 0; i < this.vendaGeradaN.length; i++) {

        this.ELEMENT_DATA.push({
          vendaid: this.vendaGeradaN[i].vendaid,
          produto: this.vendaGeradaN[i].nomeProduto,
          filial: this.vendaGeradaN[i].nomeFilial,
          valor: this.vendaGeradaN[i].valor,
          quantidade: this.vendaGeradaN[i].qtde,
          desconto: this.vendaGeradaN[i].desconto,
          produto_id: this.vendaGeradaN[i].produtoid,
          clienteid: this.vendaGeradaN[i].clienteid,
          dataVenda: new Date(formattedDate),
          total: this.vendaGeradaN[i].total
        });

      }

      this.cliente_id = this.vendaGeradaN[0].clienteid;
      this.produto_id = this.vendaGeradaN[0].produtoid;
      this.filial_id1 = this.vendaGeradaN[0].filialid;
      this.vendaid = this.vendaGeradaN[0].vendaid;
      //   this.dataSource.pa

      // dataSource = new MatTableDataSource(this.ELEMENT_DATA);

      console.log('  this.ELEMENT_DATA');
      console.log(this.ELEMENT_DATA);

      console.log(' dataSource');
      console.log(this.dsDataSource);

      //this.dsDataSource.pa

      /// this.dataSource.paginator = this.paginator;

      this.table.renderRows();
    });



    this.clienteService.PegarTodos().subscribe((resultado) => {
      this.clientes = resultado;
    });

    this.produtoService.PegarTodos().subscribe((resultado) => {
      this.produtosFilial = resultado;
    });

    this.filialService.PegarTodos().subscribe((resul) => {
      this.filiais = resul;
    });

  }


  AtualizaVenda(): void {

    console.log('dsDataSource 1');
    console.log(this.dsDataSource.length);
    console.log(this.dsDataSource);

    console.log(this.ELEMENT_DATA.length);

    this.ELEMENT_DATA.push({
      vendaid: this.vendaid,
      produto: "1",
      filial: " produtos1[0].nomeFilial",
      valor: 100,
      quantidade: 1,
      desconto: 1,
      produto_id: 2,
      clienteid: 2,
      dataVenda: new Date(),
      total: 10
    });
    console.log('AtualizaVenda 3');
    console.log(this.ELEMENT_DATA);

    console.log('dsDataSource 3');
    console.log(this.dsDataSource.length);
    console.log(this.dsDataSource);


    this.dsDataSource = this.ELEMENT_DATA;


    // this.table.renderRows();
  }


  IncluirVenda(): void {

    const vendaFat: VendaFaturada = this.formulario.value;

    const produtos1 = this.produtosFilial.filter(x => x.produtoid == this.produto_id);
    console.log('vendaFat');
    console.log(vendaFat);
    console.log(produtos1[0].nomeFilial);

    console.log(vendaFat.dataVenda);

    /* 
     Compras acima de 4 itens idênticos têm 10% de desconto
    * Compras entre 10 e 20 itens idênticos têm 20% de desconto
    * Não é possível vender acima de 20 itens idênticos
    * Compras abaixo de 4 itens não podem ter desconto  */

    if (vendaFat.quantidade < 4) {
      vendaFat.desconto = 0;
    }

    if (vendaFat.quantidade > 4) {
      vendaFat.desconto = (0.10 * vendaFat.valor);;
    }

    if (vendaFat.quantidade >= 10 && vendaFat.quantidade <= 20) {

      vendaFat.desconto = (0.20 * vendaFat.valor);
    }

    if (vendaFat.quantidade > 20) {
      alert('não e possivel vender mais que 20 produtos');
      return;
    }

    let formattedDate = this.formatarDataNew(vendaFat.dataVenda.toString());

    console.log(formattedDate);

    this.ELEMENT_DATA.push({
      vendaid: this.vendaid,
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


    console.log('ELEMENT_DATA');
    console.log(this.ELEMENT_DATA);

    this.table.renderRows();

  }


  formatarDataNew(myDate: string): string {
    const dataFormat = myDate.substring(3, 6) + myDate.substring(0, 2) + myDate.substring(5);
    return dataFormat;
  }


  ShowMensagem(titulo: string, msg: string, tipoMesagem: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '400px',
      data: { title: titulo, nome: msg, tipoMesagem }
    });
  }


}
