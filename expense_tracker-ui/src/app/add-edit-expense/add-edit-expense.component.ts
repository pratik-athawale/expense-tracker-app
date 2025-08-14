import { Component, InjectionToken, Input, OnInit, Inject } from '@angular/core';
import { Expense } from '../Expense';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { ExpenseServiceService } from '../services/expense-service.service';
import { NgForm } from '@angular/forms';
import { ShowSnackbarService } from '../core/show-snackbar.service';

@Component({
  selector: 'app-add-edit-expense',
  templateUrl: './add-edit-expense.component.html',
  styleUrls: ['./add-edit-expense.component.css']
})
export class AddEditExpenseComponent implements OnInit {

  expense: Expense;
  myDate: string;
  formIsValid = true;
  expense1: Expense = new Expense();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Expense, 
    private _expenseService: ExpenseServiceService, 
    private _dialogRef: MatDialogRef<AddEditExpenseComponent>,
    private _snackbarService: ShowSnackbarService
  ) {}

  ngOnInit(): void {
    this.expense = this.data? this.data: new Expense(); // Initialize with the provided data or create a new instance
    this.myDate = this.formatDate(this.expense.date);
  }

  onSubmit(form: NgForm) {
    if (this.formIsValid) 
    {
      const expenseData: Expense = form.value;  // or should I use bounded object 
      if (this.data) 
      {
        this._expenseService.updateExpense(this.data.id, expenseData).subscribe({
          next: (val: any) => {
            this._snackbarService.openSnackBar('Expense updated successfully', 'OK');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } 
      else 
      {
        this._expenseService.addExpense(expenseData).subscribe({
          next: (val: any) => {
            this._snackbarService.openSnackBar('Expense added successfully', 'OK');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      
    }
  }

  private formatDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }
}

