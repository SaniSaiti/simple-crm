import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';



@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user!: User;
  userid!:string ;
  loading = false;
  constructor(public dialogRef: 
    MatDialogRef<DialogEditUserComponent>, 
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
