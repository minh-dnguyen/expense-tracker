const fs = require("fs");
const chalk = require("chalk");
const Table = require("cli-table3");

const EXPENSES_FILE = "expenses.json";

// =================================================================
// Part 1: Core Data Functions
// =================================================================

/**
 * Reads all expenses from the JSON file.
 */
const readExpenses = () => {
  try {
    const dataBuffer = fs.readFileSync(EXPENSES_FILE);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    // If the file doesn't exist, return an empty array.
    return [];
  }
};

/**
 * Writes an array of expenses back to the JSON file.
 */
const writeExpenses = (expenses) => {
  // This line converts the array into a nicely formatted string
  const dataJSON = JSON.stringify(expenses, null, 2);
  // This line overwrites the file with the new data
  fs.writeFileSync(EXPENSES_FILE, dataJSON);
};

// =================================================================
// Part 2: Command Logic Functions
// =================================================================

/**
 * Logic for the 'add' command.
 */
const addExpense = (amount, category, description) => {
  const expenses = readExpenses();
  const newExpense = {
    id: Date.now().toString(),
    amount,
    category,
    description: description || "N/A",
    date: new Date().toLocaleDateString(),
  };
  expenses.push(newExpense);
  writeExpenses(expenses);
  console.log(chalk.green.bold("Expense added successfully!"));
};

/**
 * Logic for the 'view' command.
 */
const viewExpenses = () => {
  const expenses = readExpenses();
  // ... (code to display the table using cli-table3)
};

/**
 * Logic for the 'delete' command.
 */
const deleteExpense = (id) => {
  const expenses = readExpenses();
  // This line creates a new array without the deleted item
  const expensesToKeep = expenses.filter((expense) => expense.id !== id);

  if (expenses.length > expensesToKeep.length) {
    writeExpenses(expensesToKeep);
    console.log(chalk.green.bold("Expense deleted."));
  } else {
    console.log(chalk.red.bold("Expense not found."));
  }
};

/**
 * Logic for the 'summary' command.
 */
const summarizeExpenses = () => {
  const expenses = readExpenses();
  // This calculates the total
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  // This groups expenses by category
  const byCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  // ... (code to display the summary)
};

// =================================================================
// Part 3: Exporting the Functions
// =================================================================

// This makes the command functions available to index.js
module.exports = {
  addExpense,
  viewExpenses,
  deleteExpense,
  summarizeExpenses,
};
