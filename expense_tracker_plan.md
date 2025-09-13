# Expense Tracker Project Plan

This document outlines the steps to build a fully functional Expense Tracker CLI using Node.js.

## Technology Stack

- **Runtime:** Node.js
- **Command-line arguments:** `yargs`
- **Output styling:** `chalk`
- **Tabular data display:** `cli-table3`
- **Data storage:** JSON file (`expenses.json`)

## Step-by-Step Guide

### Step 1: Project Setup

1.  **Initialize a new Node.js project:**
    Open your terminal in the project directory and run:

    ```bash
    npm init -y
    ```

    This will create a `package.json` file.

2.  **Install dependencies:**
    ```bash
    npm install yargs chalk cli-table3
    ```

### Step 2: Create the File Structure

Create the following files in your project directory:

- `index.js`: The main entry point for your CLI application.
- `utils.js`: A helper file for functions that read from and write to the data store.
- `expenses.json`: This file will be created automatically by the application to store your expenses. You can create an empty file to start with `[]`.

### Step 3: Implement Helper Functions (`utils.js`)

In `utils.js`, create two functions:

1.  `readExpenses()`: This function will read the `expenses.json` file, parse it, and return the array of expenses. It should handle cases where the file doesn't exist yet.
2.  `writeExpenses(expenses)`: This function will take an array of expenses, stringify it, and write it back to `expenses.json`.

### Step 4: Implement Commands in `index.js`

In `index.js`, you will use `yargs` to define the structure of your CLI, including all the commands and their options. This setup will connect the command-line inputs to the utility functions you'll create in `utils.js`.

Below is a detailed guide on how to structure your `index.js` file.

1.  **Add the shebang and require necessary modules:**
    The `#!/usr/bin/env node` line ensures the script is executed as a Node.js script. You'll also need to import `yargs` and the functions from `utils.js`.

2.  **Set up `yargs` commands:**
    Use the `.command()` method for each command you want to implement. Each command has a `command` name, a `describe` string, a `builder` object for defining options, and a `handler` function that executes when the command is run.

Here is the complete code for setting up `yargs` in `index.js`:

```javascript
#!/usr/bin/env node
const yargs = require("yargs");
// We will create these functions in the next step in utils.js
const {
  addExpense,
  viewExpenses,
  deleteExpense,
  summarizeExpenses,
} = require("./utils");

yargs
  .command({
    command: "add",
    describe: "Add a new expense",
    // The builder object defines the command's options
    builder: {
      amount: {
        describe: "Expense amount",
        demandOption: true, // This makes the option required
        type: "number",
      },
      category: {
        describe: "Expense category",
        demandOption: true,
        type: "string",
      },
      description: {
        describe: "Expense description",
        demandOption: false, // This option is not required
        type: "string",
      },
    },
    // The handler function is called when the command is executed
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
    describe: "Delete an expense by ID",
    builder: {
      id: {
        describe: "Expense ID",
        demandOption: true,
        type: "string", // ID can be a string or number
      },
    },
    handler(argv) {
      deleteExpense(argv.id);
    },
  })
  .command({
    command: "summary",
    describe: "Summarize expenses",
    handler() {
      summarizeExpenses();
    },
  })
  .help().argv; // Enables the --help option // Parses the arguments
```

### Step 5: Implement the `view` Command (`index.js`)

1.  Define the `view` command using `yargs`.
2.  When the command is run, it should:
    - Read the expenses using `readExpenses()`.
    - If there are no expenses, print a message.
    - If there are expenses, use `cli-table3` to display them in a formatted table with columns like `ID`, `Amount`, `Category`, `Description`, and `Date`.

### Step 6: Implement the `delete` Command (`index.js`)

1.  Define the `delete` command that takes an `id` as an option.
2.  When the command is run, it should:
    - Read the expenses.
    - Find the expense with the matching ID.
    - Remove it from the array.
    - Write the modified array back to the file.
    - Log a confirmation message.

### Step 7: Implement the `summary` Command (`index.js`)

1.  Define the `summary` command.
2.  When the command is run, it should:
    - Read all expenses.
    - Calculate relevant statistics, such as:
      - Total number of expenses.
      - Total amount spent.
      - A breakdown of expenses by category.
    - Display this summary in a clear and readable format.

### Step 8: Final Touches

- Make your CLI executable by adding `#!/usr/bin/env node` to the top of `index.js`.
- Add a `bin` field in your `package.json` so you can run the command globally if you wish.
- Review and refine your code, adding comments and improving user messages.
- Thoroughly test all commands.
