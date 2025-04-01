import { Filial } from '../../Filial';
import { Produto } from '../../Produto';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ProdutoFilial } from '../../model/ProdutoFilial';
import { FilialService } from '../../services/filial.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-filial',
  standalone: false,
  
  templateUrl: './filial.component.html',
  styleUrl: './filial.component.css'
})
export class FilialComponent  implements OnInit{
  
   formulario: any;
    tituloFormulario!: string; 
    filiais!: Filial[];
    nomeFilial!: string;
    filialId!: number;
  
    visibilidadeTabela: boolean = true;
    visibilidadeFormulario: boolean = false; 
  
    modalRef!: BsModalRef ;
    produtos!: Produto[];

     constructor(
      private produtoService: ProdutoService,
      private filialService: FilialService,
      public dialog: MatDialog,
      private modalService: BsModalService
    ) {}
    
  
  ngOnInit(): void {  

    this.tituloFormulario = 'Nova Filial';
    this.formulario = new FormGroup({
      nome: new FormControl(null)
    });

    this.filialService.PegarTodos().subscribe((resultado) => {
      this.filiais  = resultado;
      console.log('this.pessoas');
      console.log(this.filiais);
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Filial';
    this.formulario = new FormGroup({
      nome: new FormControl(null),    
    });
  }

  ExibirFormularioAtualizacao(filialid: any): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

   // pessoaId = 1;
    console.log('aui');
    console.log(filialid);

    this.filialService.PegarPeloId(filialid).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nome}`;

      this.formulario = new FormGroup({
        filialid: new FormControl(resultado.filialid),
        nome: new FormControl(resultado.nome),
      });
    });
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

EnviarFormulario(): void {
    const filial: Filial = this.formulario.value;

    console.log('EnviarFormulario');
    console.log(filial);
    console.log(filial.filialid);

    if (filial.filialid > 0) {
      console.log('aqui');
      this.filialService.AtualizarPessoa(filial).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        console.log('salvar mensagem 2');
        this.ShowMensagem('Filial', 'Atualizada com Sucesso', 'close');

        this.filialService.PegarTodos().subscribe((registros) => {
          this.filiais = registros;
        });
      });
    } else {
      console.log('aqui 2');
      
      this.filialService.SalvarFilial(filial).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        //alert('filial inserida com sucesso');        
        this.ShowMensagem('Filial', 'filial Incluída com Sucesso', 'close');
        this.filialService.PegarTodos().subscribe((registros) => {
          this.filiais = registros;
        });

      }); 
    }
  }

ExibirConfirmacaoExclusao(filialid :number, nomeFilial: string, conteudoModal: TemplateRef<any>): void {
    console.log('conteudoModal');
    console.log(conteudoModal);
    this.modalRef = this.modalService.show(conteudoModal);
    this.filialId = filialid;
    this.nomeFilial = nomeFilial;
  }

  ExcluirPessoa(filialid : number){
    this.filialService.ExcluirPessoa(filialid).subscribe(resultado => {
      this.modalRef.hide();
      
      this.ShowMensagem('Filial', 'Filial excluída com Sucesso', 'close');

      this.filialService.PegarTodos().subscribe(registros => {
        this.filiais = registros;
      });
    });
  }


  ExibirListadeProdutos(filialid :number, nomeFilial: string, conteudoModal: TemplateRef<any>): void {
    
    this.produtoService.PegarProdutoFilial(filialid).subscribe((resultado) => {
      this.produtos  = resultado;
      console.log('produtosFilial');
      console.log(this.produtos);
    }); 

    this.modalRef = this.modalService.show(conteudoModal);
    this.filialId = filialid;
    this.nomeFilial = nomeFilial;
  }


  ShowMensagem(titulo: string, msg: string, tipoMesagem: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '400px',
      data: { title: titulo, nome: msg, tipoMesagem }
    });
  } 

}
