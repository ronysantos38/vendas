import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendasComponent } from './components/vendas/vendas.component';
import { FilialComponent } from './components/filial/filial.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VendaFilialComponent } from './components/venda-filial/venda-filial.component';
import { VendaClienteComponent } from './components/venda-cliente/venda-cliente.component';
import { VendaProdutoComponent } from './components/venda-produto/venda-produto.component';
import { VendaCriadaComponent } from './detalheVenda/venda-criada/venda-criada.component';
import { VendaModificadaComponent } from './detalheVenda/venda-modificada/venda-modificada.component';
import { VendaCanceladaComponent } from './detalheVenda/venda-cancelada/venda-cancelada.component';
import { TratarVendaComponent } from './detalheVenda/tratar-venda/tratar-venda.component';


console.log("tetewtwtew");

const routes: Routes = [
  { path: 'pessoas', component: PessoasComponent },
  { path: 'filiais', component: FilialComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'vendasFilial', component: VendaFilialComponent },
  { path: 'vendasCliente', component: VendaClienteComponent },
  { path: 'vendasproduto', component: VendaProdutoComponent },
  { path: 'vendascriada', component: VendaCriadaComponent },
  { path: 'vendasmodificada', component: VendaModificadaComponent },
  { path: 'vendascancelada', component: VendaCanceladaComponent },
  { path: 'tratarvendas', component: TratarVendaComponent },
  
  

  { path: '', component: FilialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
