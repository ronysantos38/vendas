import { SharedModule } from './../shared/shared.module';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogParams {
  title: string;
  nome: string;
  tipoMesagem: string;
}

 

@Component({
  selector: 'app-dialog',
  templateUrl: './dialogR.component.html',
  styleUrls: ['./dialogR.component.scss']
})
export class DialogRComponent implements OnInit {

  constructor(
   public dialogRefR: MatDialogRef<DialogParams>, 
    @Inject(MAT_DIALOG_DATA) public obj: DialogParams
    ) { 

      dialogRefR.disableClose = true; 
    }

  ngOnInit(): void {

  }
}
