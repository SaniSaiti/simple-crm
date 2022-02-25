import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {

  user!: User;
  userid!:string ;
  loading = false;
  constructor(
  public dialogRef: MatDialogRef<DialogEditAddressComponent>,
  private firestore: AngularFirestore
  
  ) { }

  ngOnInit(): void {
  }

  safeUser(){
    this.loading = true;
    this.firestore
    .collection('users')
    .doc(this.userid)
    .update(this.user.toJson())   
    .then(()=>{
      this.loading = false;
      this.dialogRef.close(); 
    })
  }

}
