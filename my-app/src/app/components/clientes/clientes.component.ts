import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FilialService } from '../../services/filial.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from '../../model/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-clientes',
  standalone: false,
  
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

formulario: any;
    tituloFormulario!: string; 
    clientes!: Cliente[];
    nomeCliente!: string;
    clienteid!: number;
  
    visibilidadeTabela: boolean = true;
    visibilidadeFormulario: boolean = false; 
  
    modalRef: BsModalRef | undefined;

         constructor(
          private clienteService: ClienteService,
          public dialog: MatDialog,
          private modalService: BsModalService
        ) {}


        ngOnInit(): void {  

          this.tituloFormulario = 'Novo Cliente';
          this.formulario = new FormGroup({
            nome: new FormControl(null)
          });
      
          this.clienteService.PegarTodos().subscribe((resultado) => {
            this.clientes  = resultado;
            console.log('this.pessoas');
            console.log(this.clientes);
          });
        }
      
        ExibirFormularioCadastro(): void {
          this.visibilidadeTabela = false;
          this.visibilidadeFormulario = true;
          this.tituloFormulario = 'Novo Cliente';
          this.formulario = new FormGroup({
            nome: new FormControl(null),    
          });
        }
      
        ExibirFormularioAtualizacao(clienteid: any): void {
          this.visibilidadeTabela = false;
          this.visibilidadeFormulario = true;
      
         // pessoaId = 1;
          console.log('aui');
          console.log(clienteid);
      
          this.clienteService.PegarPeloId(clienteid).subscribe((resultado) => {
            this.tituloFormulario = `Atualizar ${resultado.nome}`;
      
            this.formulario = new FormGroup({
              clienteid: new FormControl(resultado.clienteid),
              nome: new FormControl(resultado.nome),
            });
          });
        }
      
        Voltar(): void {
          this.visibilidadeTabela = true;
          this.visibilidadeFormulario = false;
        }
      
      EnviarFormulario(): void {
          const cliente: Cliente = this.formulario.value;
      
          console.log('EnviarFormulario');
          console.log(cliente);
          console.log(cliente.clienteid);
      
          if (cliente.clienteid > 0) {
            console.log('aqui');
            this.clienteService.AtualizarPessoa(cliente).subscribe((resultado) => {
              this.visibilidadeFormulario = false;
              this.visibilidadeTabela = true;
              this.ShowMensagem('Cliente', 'Atualizada com Sucesso', 'close');
              this.clienteService.PegarTodos().subscribe((registros) => {
                this.clientes = registros;
              });
            });
          } else {
            console.log('aqui 2');
            this.clienteService.SalvarPessoa(cliente).subscribe((resultado) => {
              this.visibilidadeFormulario = false;
              this.visibilidadeTabela = true;
              
              this.ShowMensagem('Cliente', 'Incluido com Sucesso', 'close');

              this.clienteService.PegarTodos().subscribe((registros) => {
                this.clientes = registros;
              });
            });
          }
        }
      
      ExibirConfirmacaoExclusao(clienteid :number, nomeFilial: string, conteudoModal: TemplateRef<any>): void {
          this.modalRef = this.modalService.show(conteudoModal);
          this.clienteid = clienteid;
          this.nomeCliente = nomeFilial;
        }
      
        ExcluirPessoa(clienteid : number){
          this.clienteService.ExcluirPessoa(clienteid).subscribe(resultado => {
            this.modalRef?.hide();
            this.ShowMensagem('Cliente', 'Excluído com Sucesso', 'close');

            this.clienteService.PegarTodos().subscribe(registros => {
              this.clientes = registros;
            });
          });
        }

  ShowMensagem(titulo: string, msg: string, tipoMesagem: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: '400px',
      data: { title: titulo, nome: msg, tipoMesagem }
    });
  } 

      

}
