export interface VendaGerada {
    vendaid: number;
    produtoid: number;
    filialid: number;
    clienteid: number;
    nomeCliente: string;     
    nomeProduto: string;     
    nomeFilial: string;   
    dataVenda: Date;
    valor: number;
    desconto: number;
    qtde: number;
    total: number;
}



