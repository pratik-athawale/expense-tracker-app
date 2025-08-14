package com.example.expensetracker.controllers;

import com.example.expensetracker.dao.ExpenseRepository;
import com.example.expensetracker.model.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        Expense existingExpense = expenseRepository.findById(id).orElse(null);

        if (existingExpense != null) {
            existingExpense.setTitle(updatedExpense.getTitle());
            existingExpense.setMoney(updatedExpense.getMoney());
            existingExpense.setType(updatedExpense.getType());
            existingExpense.setDate(updatedExpense.getDate());

            return expenseRepository.save(existingExpense);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
    }
}
