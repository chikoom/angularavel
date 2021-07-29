import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];
  lastPage = 1;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.load();
  }

  load(pageNumber: number = 1) {
    this.usersService.all(pageNumber).subscribe((res: any) => {
      console.log(res);
      this.users = res.data;
      this.lastPage = res.meta.last_page;
    });
  }

  deleteUser(userID: number): void {
    if (confirm('Really DELETE user?')) {
      this.usersService.delete(userID).subscribe(res => {
        this.users = this.users.filter(user => user.id !== userID);
      });
    }
  }

  editUser(userID: number): void {
    console.log(userID);
  }

}
