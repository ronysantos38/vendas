import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Filial } from '../../../Filial';
import { ProdutoService } from '../../../services/produto.service';
import { FilialService } from '../../../services/filial.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { VendasService } from '../../../services/vendas.service';
import { VendaGerada } from '../../../model/VendaGerada';
import { VendaGeradaInput } from '../../../model/VendaGeradaInput';
import { TratarVendaComponent } from '../tratar-venda.component';
import { VendaEfetuada } from '../../../model/VendaEfetuada';
import { ProdutoFilial } from '../../../model/ProdutoFilial';
import { VendaFaturada } from '../../../model/VendaFaturada';
import { VendaRealizadas } from '../../../model/VendaRealizadas';
import { VendaEfetuadaInput } from '../../../model/VendaEfetuadaInput';
import { VendaListadaGeral } from '../../../model/VendaListadaGeral ';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../dialog/dialog.component';
//import { MatDialog } from '@angular/material/dialog';

export interface VendasItem {
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

interface Data {
  vendaid: number;
  produtoid: number;
  element: VendasItem;
}


@Component({
  selector: 'app-editar-produto',
  standalone: false,

  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css'
})
export class EditarProdutoComponent {

  @Input() vendaid!: number;
  @Input() produtoid!: number;

  @Input() ELEMENT_DATA: VendasItem[] = [];
  @Input() ELEMENT_DATA_New!: VendasItem;

  dsDataSource = this.ELEMENT_DATA;
  dsDataFiltro = this.ELEMENT_DATA;

  dsVendaItem!: VendasItem;

  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) { }


  openDialogEdit(): void {

    const dialogRef = this.dialog.open<EditarProdutoDialog, Data, Data>(EditarProdutoDialog, {
      width: '900px',
      maxHeight: '640px',
      data: {
        vendaid: this.vendaid,
        produtoid: this.produtoid,
        element: this.dsVendaItem
      }
    }); dialogRef.afterClosed().subscribe(

    );

  }
}

@Component({
  standalone: false,
  templateUrl: 'ProdutoTemplate.html',
  styleUrls: ['ProdutoTemplate.scss'],
  providers: [
    //  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    //  {provide: MAT_DATE_FORMATS, useValue: DEMO_MOMENT_MONTH_YEAR_FORMATS},
  ]
})
export class EditarProdutoDialog implements OnInit, AfterViewInit {

  formulario: any;
  tituloFormulario!: string;

  filiais!: Filial[];
  filial_id!: number;
  produtosFilial!: ProdutoFilial[];

  vendaGeradaN10!: VendaListadaGeral;
  vendaRealizada!: VendaEfetuada[];
  vendaRealizadas!: VendaRealizadas;
  vendaEfetuadaInput!: VendaEfetuadaInput;

  vendaEfetuada!: VendaEfetuada;
  produto_id!: number;
  vendaefetuada_id!: number;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<Data>,    
    private filialService: FilialService,
    private vendasService: VendasService,
    private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public tratarVendaComponent: TratarVendaComponent    
    //private modalService: BsModalService
  ) { }





  ngAfterViewInit(): void {
    console.log('Method ngAfterViewInit.');
  }
  ngOnInit(): void {

    this.tituloFormulario = 'Editar Produto';
    this.formulario = new FormGroup({

      valor: new FormControl(null),
      quantidade: new FormControl(null)
    });

    this.vendasService.ItemVendaRealizada(this.data.vendaid, this.data.produtoid).subscribe((resultado) => {
      this.vendaGeradaN10 = resultado;

      console.log('resultado');
      console.log(resultado);

      console.log('veja aqui');
      console.log(this.vendaGeradaN10);

      this.filial_id = resultado.filialid;
      this.produto_id = resultado.produtoid;

      this.vendaefetuada_id = resultado.vendaGeradaid;


      5


      this.formulario = new FormGroup({

        valor: new FormControl(resultado.valor),
        quantidade: new FormControl(resultado.qtde),
        //  nomefilial2: new FormControl('', [Validators.required]),
      });


    });

    this.filialService.PegarTodos().subscribe((resul) => {
      this.filiais = resul;
      console.log('this.filiais');
      console.log(this.filiais);
    });

    this.produtoService.PegarTodos().subscribe((resultado) => {
      this.produtosFilial = resultado;
    });


  }

  EnviarFormulario(): void {


    this.vendaRealizada = [];

    const vendaFat: VendaFaturada = this.formulario.value;

    const data1 = new Date();
    const formattedDate1 = data1.toLocaleString();

    const novaDataFormat = formattedDate1.substring(0, 10);
    console.log(novaDataFormat);

    this.vendaEfetuadaInput = new VendaEfetuadaInput();

    let formattedDate = this.formatarDataNew(novaDataFormat);
    //this.formatarDataNew(this.vendaGeradaN.dataVenda.toString());




    /****Regra da venda */

    /* 
     Compras acima de 4 itens idênticos têm 10% de desconto
    * Compras entre 10 e 20 itens idênticos têm 20% de desconto
    * Não é possível vender acima de 20 itens idênticos
    * Compras abaixo de 4 itens não podem ter desconto  */

    if (Number(vendaFat.quantidade) < 4) {
      vendaFat.desconto = 0;
    }

    if (Number(vendaFat.quantidade) > 4) {
      vendaFat.desconto = (0.10 * Number(vendaFat.valor));;
    }

    if (Number(vendaFat.quantidade) >= 10 && Number(vendaFat.quantidade) <= 20) {

      vendaFat.desconto = (0.20 * Number(vendaFat.valor));
    }

    if (Number(vendaFat.quantidade) > 20) {
      alert('não e possivel vender mais que 20 produtos');
      return;
    }


    this.vendaEfetuadaInput.vendaefetuadaid = this.vendaefetuada_id;
    this.vendaEfetuadaInput.clienteid = this.vendaGeradaN10.clienteid;
    this.vendaEfetuadaInput.vendaid = this.vendaGeradaN10.vendaid;
    this.vendaEfetuadaInput.produtoid = this.produto_id;
    this.vendaEfetuadaInput.dataVenda = new Date(formattedDate);
    this.vendaEfetuadaInput.valor = Number(vendaFat.valor);
    this.vendaEfetuadaInput.desconto = Number(vendaFat.desconto);
    this.vendaEfetuadaInput.qtde = Number(vendaFat.quantidade);
    this.vendaEfetuadaInput.filialid = this.filial_id;


    this.vendaEfetuada = this.vendaEfetuadaInput;

    //ModificarVendaRealizada

    this.vendasService.ModificarVendaRealizada(this.vendaEfetuada).subscribe((resultado) => {

      this.ShowMensagem('Venda', 'Modificada com Sucesso', 'close');      
    });

    this.tratarVendaComponent.ngOnInit();

    //this.router.navigateByUrl('/vendascriada');
    this.router.navigate(['/tratarvendas']);


    this.dialogRef.close();

    /*
        
       this.tratarVendaComponent.AtualizaVenda();
    
        //  this.cronograma.atualizado.emit(true);
       // this.projetoPocoInput = new TransicaoPocoInput();   
    
        //this.vendasService.vendaGerada.nomeProduto = this.formulario.nome;
    */


  }

  Voltar(): void { }

  formatarDataNew(myDate: string): string {
    const dataFormat = myDate.substring(3, 6) + myDate.substring(0, 2) + myDate.substring(5);
    return dataFormat;
  }

  valorProduto(produtoid: number): void {

    const produtos1 = this.produtosFilial.filter(x => x.produtoid == produtoid);

    this.formulario = new FormGroup({
      valor: new FormControl(produtos1[0].valor)
    });
  }

    ShowMensagem(titulo: string, msg: string, tipoMesagem: string): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        minWidth: '400px',
        data: { title: titulo, nome: msg, tipoMesagem }
      });
    } 
  

}