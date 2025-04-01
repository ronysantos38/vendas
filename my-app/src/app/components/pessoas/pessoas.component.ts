import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PessoasService } from '../../pessoas.service';
import { Pessoa } from '../../Pessoa';

@Component({
  selector: 'app-pessoas',
  standalone: false,
  
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css'
})
export class PessoasComponent  implements OnInit{

  formulario: any;
  tituloFormulario!: string; 
  pessoas!: Pessoa[];
  nomePessoa!: string;
  pessoaId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 

  modalRef: BsModalRef | undefined;
  
 constructor(
  private pessoasService: PessoasService,
  private modalService: BsModalService
) {}


  ngOnInit(): void {
    
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });

    this.pessoasService.PegarTodos().subscribe((resultado) => {
      this.pessoas = resultado;
      console.log('this.pessoas');
      console.log(this.pessoas);
    });

  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null),
    });
  }

  ExibirFormularioAtualizacao(pessoaId: any): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

   // pessoaId = 1;
console.log('aui');

console.log(pessoaId);

    this.pessoasService.PegarPeloId(pessoaId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaid: new FormControl(resultado.pessoaid),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao),
      });
    });
  }



  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    console.log('EnviarFormulario');
    console.log(pessoa);
    console.log(pessoa.pessoaid);

    if (pessoa.pessoaid > 0) {
      console.log('aqui');
      this.pessoasService.AtualizarPessoa(pessoa).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Pessoa atualizada com sucesso');
        this.pessoasService.PegarTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    } else {
      console.log('aqui 2');
      this.pessoasService.SalvarPessoa(pessoa).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Pessoa inserida com sucesso');
        this.pessoasService.PegarTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    }
  }

  ExibirConfirmacaoExclusao(pessoaId :number, nomePessoa: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  ExcluirPessoa(pessoaId : number){
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado => {
      this.modalRef?.hide();
      alert('Pessoa excluída com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros => {
        this.pessoas = registros;
      });
    });
  }



}
