import { Filial } from '../../Filial';
import { Produto } from '../../Produto';
import { ProdutoFilial } from '../../model/ProdutoFilial';
import { FilialService } from '../../services/filial.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-produto',
  standalone: false,
  
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent  implements OnInit {
  
      formulario: any;
      tituloFormulario!: string; 
      produtos!: Produto[];
      produtosFilial!: ProdutoFilial[];
      nomeProduto!: string;
      produtoid!: number;
      filiais!: Filial[];
      filial_id!: number;

      visibilidadeTabela: boolean = true;
      visibilidadeFormulario: boolean = false;     
      modalRef: BsModalRef | undefined;    
     
      constructor(
        private produtoService: ProdutoService,
        private  filialService : FilialService,
         public dialog: MatDialog,
        private modalService: BsModalService
      ) {}

  ngOnInit(): void {
    
    this.tituloFormulario = 'Nova Filial';
    this.formulario = new FormGroup({   
      nome : new FormControl(null),
      valor : new FormControl(null),
     //  nomefilial2: new FormControl('', [Validators.required]),
    });

    this.produtoService.PegarTodos().subscribe((resultado) => {
      this.produtosFilial  = resultado;
      console.log('produtosFilial');
      console.log(this.produtosFilial);
    }); 

  }


  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Produto';
    
    this.formulario = new FormGroup({
      nome: new FormControl(null),    
      valor: new FormControl(null),   
    });

    this.filialService.PegarTodos().subscribe((resul) => {
      this.filiais  = resul;
      console.log('this.filiais');
      console.log(this.filiais);
    });

  }

  ExibirFormularioAtualizacao(produtoid: any): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

   // pessoaId = 1;
    console.log('aui');
    console.log(produtoid);

    this.produtoService.PegarPeloId(produtoid).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nomeProduto}`;

      console.log('Atualizar');
      console.log(resultado);


      this.filialService.PegarTodos().subscribe((resul) => {
        this.filiais  = resul;
        console.log('this.filiais');
        console.log(this.filiais);
      });

      this.filial_id = resultado.filialid;

      console.log('filial_id');
      console.log(this.filial_id);

      //this.filial_id = 1;

      this.formulario = new FormGroup({
        produtoid: new FormControl(resultado.produtoid),
        nome: new FormControl(resultado.nomeProduto),
        valor: new FormControl(resultado.valor),
        
      });
    });
  }

  Voltar(): void {

    console.log("escolhido") 
    console.log(this.filial_id) 
    
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

EnviarFormulario(): void {
    const produto: Produto = this.formulario.value;

    console.log('EnviarFormulario');
   
    produto.filialid = this.filial_id;
    console.log(produto);
    

    if (produto.produtoid > 0) {
      console.log('aqui');
      this.produtoService.AtualizarPessoa(produto).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        
        this.ShowMensagem('Produto', 'Atualizada com Sucesso', 'close');
        this.produtoService.PegarTodos().subscribe((registros) => {
          this.produtosFilial = registros;
        });
      });
    } else {
      console.log('aqui 2');
      this.produtoService.SalvarPessoa(produto).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.ShowMensagem('Produto', 'Incluída com Sucesso', 'close');
       
        this.produtoService.PegarTodos().subscribe((registros) => {
        this.produtosFilial = registros;
        });
      });
    }
  }
  

ExibirConfirmacaoExclusao(produtoid :number, nomeFilial: string, conteudoModal: TemplateRef<any>): void {
  console.log('conteudoModal');
  console.log(conteudoModal);  
    this.modalRef = this.modalService.show(conteudoModal);
    this.produtoid = produtoid;
    this.nomeProduto = nomeFilial;
  }

  ExcluirPessoa(produtoid : number){
    this.produtoService.ExcluirPessoa(produtoid).subscribe(resultado => {
      this.modalRef?.hide();
      
      this.ShowMensagem('Produto', 'Produto excluída com Sucesso', 'close');

      this.produtoService.PegarTodos().subscribe(registros => {
        this.produtosFilial = registros;
      });
    });
  }

  toggleSelection(user: Filial) {
    console.log('user');
   console.log(user);
  }

  
    ShowMensagem(titulo: string, msg: string, tipoMesagem: string): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        minWidth: '400px',
        data: { title: titulo, nome: msg, tipoMesagem }
      });
    } 
  
}
