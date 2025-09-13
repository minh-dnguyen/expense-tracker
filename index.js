#!/usr/bin/env node
const yargs = require("yargs");
const {
  addExpense,
  viewExpenses,
  deleteExpense,
  summarizeExpenses,
} = require("./utils.js");

yargs
  .command({
    command: "add",
    describe: "Add a new expense",
    builder: {
      amount: {
        describe: "Expense amount",
        demandOption: true,
        type: "number",
      },
      category: {
        describe: "Expense category",
        demandOption: true,
        type: "string",
      },
      description: {
        describe: "A short description of the expense",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      addExpense(argv.amount, argv.category, argv.description);
    },
  })
  .command({
    command: "view",
    describe: "View all expenses",
    handler() {
      viewExpenses();
    },
  })
  .command({
    command: "delete",
    describe: "Delete an expense by its ID",
    builder: {
      id: {
        describe: "The ID of the expense to delete",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      deleteExpense(argv.id);
    },
  })
  .command({
    command: "summary",
    describe: "Show a summary of all expenses",
    handler() {
      summarizeExpenses();
    },
  })
  .help().argv;

// ... (at the top of utils.js, make sure you have your require statements)
const Table = require("cli-table3");
// ...

const summarizeExpenses = () => {
  // a. Read all expenses
  const expenses = readExpenses();

  if (expenses.length === 0) {
    console.log(chalk.yellow("No expenses to summarize."));
    return;
  }

  // b. Calculate the total amount spent
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // c. Group expenses by category and sum their amounts
  const byCategory = expenses.reduce((acc, expense) => {
    // If the category doesn't exist in our accumulator object yet, initialize it to 0
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    // Add the current expense's amount to its category's total
    acc[expense.category] += expense.amount;
    return acc;
  }, {}); // Start with an empty object as the accumulator

  // d. Display the summary
  console.log(chalk.blue.bold("--- Expense Summary ---"));
  console.log(
    chalk.white(`Total Number of Expenses: ${chalk.bold(expenses.length)}`)
  );
  console.log(
    chalk.white(`Total Amount Spent: ${chalk.bold(`$${total.toFixed(2)}`)}`)
  );
  console.log(chalk.blue.bold("\n--- Breakdown by Category ---"));

  const summaryTable = new Table({
    head: [chalk.cyan("Category"), chalk.cyan("Total Amount")],
  });

  for (const category in byCategory) {
    summaryTable.push([category, `$${byCategory[category].toFixed(2)}`]);
  }

  console.log(summaryTable.toString());
};

// ... (make sure summarizeExpenses is exported at the bottom)
