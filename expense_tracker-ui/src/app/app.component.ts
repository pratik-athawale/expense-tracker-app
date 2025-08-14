import { Expense } from './Expense';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditExpenseComponent } from './add-edit-expense/add-edit-expense.component';
import { ExpenseServiceService } from './services/expense-service.service';
import { ShowSnackbarService } from './core/show-snackbar.service';


const ELEMENT_DATA: Expense[] = [
  {
    id: 1,
    title: "food",
    money: 29,
    date: new Date("2023-10-10"),
    // date: "2023-10-10",
    type: "deduct",
  },
  {
    id: 2,
    title: "trouser",
    money: 49,
    date: new Date("2023-07-10"),
    // date: "2023-10-10",
    type: "deduct",
  },
  {
    id: 3,
    title: "shirt",
    money: 78,
    date: new Date("2023-08-10"),
    // date: "2023-10-10",
    type: "deduct",
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['id', 'title', 'money', 'date', 'type', 'action'];
  dataSource = ELEMENT_DATA;
  element: any;

  constructor(
    private _dialog: MatDialog,
    private _expenseService: ExpenseServiceService,
    private _snackbarService: ShowSnackbarService
    ){}

  ngOnInit(): void {
    this.getExpenseList();
  }

  getExpenseList() {
    this._expenseService.getExpenseList().subscribe({
      next: (res) => {
        // this.dataSource = new MatTableDataSource(res);
        this.dataSource = res;
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteExpense(id: number) {
    this._expenseService.deleteExpense(id).subscribe({
      next: (res) => {
        this._snackbarService.openSnackBar('expense deleted sucessfully', 'OK');
        this.getExpenseList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  
  openEditForm(expense: Expense) {
    const dialogRef = this._dialog.open(AddEditExpenseComponent, {
      data: expense
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpenseList();
        }
      }
    })
  }

  openAddEmployeeForm() {
    const dialogRef = this._dialog.open(AddEditExpenseComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpenseList();
        }
      }
    })
  }
}

