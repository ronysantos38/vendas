//import { SharedModule } from './../shared/shared.module';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogParams {
  title: string;
  nome: string;
  tipoMesagem: string;
} 

@Component({
  selector: 'app-dialog',
   standalone: false,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRefR: MatDialogRef<DialogParams>, 
    @Inject(MAT_DIALOG_DATA) public obj: DialogParams
    ) { 

      dialogRefR.disableClose = true; 
    }

  ngOnInit(): void {

  }
}
