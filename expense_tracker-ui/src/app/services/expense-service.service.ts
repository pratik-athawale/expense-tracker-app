import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../Expense';
 
@Injectable({
  providedIn: 'root'
})
export class ExpenseServiceService {

  port: number = 8080;    // 8080(spring boot) , 3000(json server)

  constructor(private _http: HttpClient) { }

  addExpense(expense: Expense): Observable<Expense>{
    return this._http.post<Expense>(`http://localhost:${this.port}/api/expenses`, expense);
  }

  updateExpense(id: number, expense: Expense): Observable<Expense>{
    return this._http.put<Expense>(`http://localhost:${this.port}/api/expenses/${id}`, expense);
  }

  getExpenseList(): Observable<Expense[]>{
    return this._http.get<Expense[]>(`http://localhost:${this.port}/api/expenses`);
  }

  deleteExpense(id: number): Observable<any>{
    return this._http.delete<any>(`http://localhost:${this.port}/api/expenses/${id}`);
  }
}
