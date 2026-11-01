const transactions = [
    { id: 1, type: "deposit", amount: 1000 },
    { id: 2, type: "withdraw", amount: 200 },
    { id: 3, type: "deposit", amount: 500 },
    { id: 4, type: "withdraw", amount: 100 }
];

// Calculate total deposits.
function calculateTotalDeposits() {

    return transactions
        .filter(t => t.type === "deposit")
        .reduce((total, t) => total + t.amount, 0);

}

//Calculate total withdrawals.

function calculateTotalWithdrawals() {

    return transactions
        .filter(t => t.type === "withdraw")
        .reduce((total, t) => total + t.amount, 0);

}

//Calculate final balance
function calculateBalance() {

    const deposits = calculateTotalDeposits();

    const withdrawals = calculateTotalWithdrawals();

    return deposits - withdrawals;

}

//Return the largest transaction.
function getLargestTransaction() {

    if (transactions.length === 0) {
        return null;
    }

    return transactions.reduce((largest, t) => {

        if (t.amount > largest.amount) {
            return t;
        }

        return largest;

    });

}

//Return all withdrawals
function getAllWithdrawals() {

    return transactions.filter(t => t.type === "withdraw");

}

//Prevent withdrawal if the amount is greater than current balance.
function withdraw(amount) {

    const balance = calculateBalance();

    if (amount <= 0) {
        console.log("Invalid amount");
        return;
    }

    if (amount > balance) {
        console.log("Insufficient balance");
        return;
    }

    transactions.push({
        id: transactions.length + 1,
        type: "withdraw",
        amount: amount
    });

    console.log("Withdrawal successful");

}

//Add a new transaction.
function addTransaction(type, amount) {

    if (amount <= 0) {
        console.log("Invalid amount");
        return;
    }

    if (type !== "deposit" && type !== "withdraw") {
        console.log("Invalid transaction type");
        return;
    }

    if (type === "withdraw") {

        withdraw(amount);
        return;

    }

    transactions.push({
        id: transactions.length + 1,
        type: type,
        amount: amount
    });

    console.log("Transaction added successfully");

}

console.log("Total Deposits:", calculateTotalDeposits());

console.log("Total Withdrawals:", calculateTotalWithdrawals());

console.log("Final Balance:", calculateBalance());

console.log("Largest Transaction:", getLargestTransaction());

console.log("All Withdrawals:", getAllWithdrawals());

// Test insufficient balance
withdraw(2000);

// Add a new deposit
addTransaction("deposit", 300);

console.log("Updated Transactions:", transactions);

console.log("New Balance:", calculateBalance());