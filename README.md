# Expense Tracker CLI

A simple but powerful command-line interface (CLI) to manage your personal finances. This tool allows you to easily add, view, delete, and get a summary of your expenses right from your terminal.

## Features

- **Add Expenses:** Quickly add new expenses with details like amount, category, and a description.
- **View Expenses:** Display a list of all recorded expenses in a clean, tabular format.
- **Delete Expenses:** Remove expenses by their unique ID.
- **Expense Summary:** Get a summary of your spending, including total expenses and a breakdown by category.

## Technology Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Command-line Arguments:** [yargs](https://yargs.js.org/)
- **Output Styling:** [chalk](https://github.com/chalk/chalk)
- **Tabular Display:** [cli-table3](https://github.com/cli-table/cli-table3)
- **Data Storage:** JSON file (`expenses.json`)

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 14 or higher) installed on your system.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/minh-dnguyen/expense-tracker.git
    cd expense-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

The CLI provides several commands to manage your expenses.

### Add a new expense

To add an expense, use the `add` command with the required options.

```bash
node index.js add --amount <amount> --category "<category>" --description "<description>"
```

**Example:**

```bash
node index.js add --amount 50 --category "Groceries" --description "Weekly grocery shopping"
```

### View all expenses

To see all your recorded expenses, use the `view` command.

```bash
node index.js view
```

### Delete an expense

To remove an expense, use the `delete` command and specify the expense `id`. You can find the ID by using the `view` command.

```bash
node index.js delete --id <expense-id>
```

### Get an expense summary

To get a summary of your total spending and a breakdown by category, use the `summary` command.

```bash
node index.js summary
```

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
