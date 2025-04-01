import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PessoasService } from './pessoas.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { LayoutModule } from '@angular/cdk/layout';
import { FilialComponent } from './components/filial/filial.component';
import { ProdutoComponent } from './components/produto/produto.component';
//import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component';
//import { ProfileComponent } from './profile/profile.component';
import {MatSelectModule} from '@angular/material/select';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VendasComponent } from './components/vendas/vendas.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { VendaFilialComponent } from './components/venda-filial/venda-filial.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VendaClienteComponent } from './components/venda-cliente/venda-cliente.component';
import { VendaProdutoComponent } from './components/venda-produto/venda-produto.component';
import { VendaCriadaComponent } from './detalheVenda/venda-criada/venda-criada.component';
import { VendaModificadaComponent } from './detalheVenda/venda-modificada/venda-modificada.component';
import { VendaCanceladaComponent } from './detalheVenda/venda-cancelada/venda-cancelada.component';
import { ItemCanceladoComponent } from './detalheVenda/item-cancelado/item-cancelado.component';
import { TratarVendaComponent } from './detalheVenda/tratar-venda/tratar-venda.component';
import { EditarProdutoComponent, EditarProdutoDialog } from './detalheVenda/tratar-venda/editar-produto/editar-produto.component';
//import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [ AppComponent, PessoasComponent, FilialComponent, ProdutoComponent,
     ClientesComponent, VendasComponent, VendaFilialComponent, DialogComponent, VendaClienteComponent, VendaProdutoComponent, VendaCriadaComponent, VendaModificadaComponent, VendaCanceladaComponent, ItemCanceladoComponent, 
     TratarVendaComponent, EditarProdutoComponent, EditarProdutoDialog   ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    LayoutModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatTableModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatPaginator,
    MatDialogModule,
    ModalModule.forRoot(),
  ],
  providers: [HttpClientModule, PessoasService, provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent],  
})
export class AppModule { }



