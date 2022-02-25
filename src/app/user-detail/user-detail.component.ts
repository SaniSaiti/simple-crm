import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userid: any = '';
  user:User = new User();

  constructor(
    private route:ActivatedRoute, 
    private firestore: AngularFirestore , 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userid = paramMap.get('id');
      console.log('paramaUser id ', this.userid);
      this.getUser();
  })
  }


  getUser(){
    this.firestore
    .collection('users')
    .doc(this.userid)
    .valueChanges()
    .subscribe((userWert:any) =>{
      this.user = new User(userWert);
      console.log('Return : ',this.user);
      
    });
  }

  editUser(){
   const editUser = this.dialog.open(DialogEditUserComponent)
   editUser.componentInstance.user = new User(this.user.toJson());
  editUser.componentInstance.userid = this.userid
  }

  editMenu(){
   const dialog = this.dialog.open(DialogEditAddressComponent)
   dialog.componentInstance.user = new User(this.user.toJson());
   dialog.componentInstance.userid = this.userid
  }

}
