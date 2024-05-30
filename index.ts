#! /usr/bin/env node
import inquirer from 'inquirer'
import * as readlineSync from 'readline-sync';

let myBalance = 100000; //Dollar
const correctPinCode = "12345";

console.log("\n\tWelcome to ZB Bank ATM - Machine\n");

async function inputPinCode(): Promise<void> {
    const pinCode = readlineSync.question('Please enter your PIN code: ', {
        hideEchoBack: true // Hide the pin code input
    });

    if (pinCode === correctPinCode) {
        console.log("Login successful!");
        await mainMenu(); // Call mainMenu after successful login
    } else{
        console.log("Incorrect PIN code. Please try again.");
        inputPinCode();
    }
}

async function mainMenu(): Promise<void> {
    
    console.log("\n\tMain Menu\n");

    let mainMenuSelection = await inquirer.prompt(
        [
            {
                name: "operation",
                type: "list",
                message: "Please select one option!",
                choices: ["Withdraw Money", "Check Balance", "Transfer Funds", "Fast Cash", "Exit"]
            }
        ]
    );
    if (mainMenuSelection.operation === "Withdraw Money") {
        await withdrawMoney(); // call the function to handle withdrawing money
    } else if (mainMenuSelection.operation === "Check Balance") {
        console.log('Your balance is:' + myBalance);
        await mainMenu(); // Return to main menu after the operation
    } else if (mainMenuSelection.operation === "Transfer Funds") {
        await transferFunds(); // Call the function to handle transferring funds
    } else if (mainMenuSelection.operation === "Fast Cash") {
        await fastCash(); // Call the function to handle fast cash
    } else if (mainMenuSelection.operation === "Exit") {
        console.log("Thank you for using ZB Bank ATM Services. Good Bye!");
    } else {
        console.log("Invalid choice, Please try again");
        await mainMenu(); // Return the main menu to invalid choice
    }
}
//////////////////////////WITHDRAW MONEY///////////////////////////////
async function withdrawMoney(): Promise<void> {
    let amountAns = await inquirer.prompt(
        [
            {
                name: "amount",
                type: "number",
                message: "Enter your amount!"
            }
        ]
    );
    if (amountAns.amount > myBalance){
        console.log("Insufficient funds.!")
    } else {
        myBalance -= amountAns.amount;
        console.log("You have successfuly withdrawn the amount: $" + amountAns.amount );
        console.log("Your remaining balance is: $" + myBalance);
    }
    if (myBalance <= 0) {
        console.log("Insufficient funds!");
    } else {
        await mainMenu(); // Return to main menu after the operation
    }
}  
//////////////////////FAST CASH////////////////////////////////////////
async function fastCash(): Promise<void> {
    let quickCash = await inquirer.prompt(
        [
            {
                name: "cashAmount",
                type: "list",
                message: "Select one option",
                choices: ["1000", "2000", "5000", "10000", "20000"]
            }
        ]
    );

    let cashAmount = parseInt(quickCash.cashAmount);

    if (quickCash.cashAmount > myBalance){
        console.log("Insufficient funds.!")
    } else {
        myBalance -= quickCash.cashAmount;
        console.log('Transaction completed successfuly.: $' + quickCash.cashAmount);
        console.log('Your remaning balance is: $' + myBalance );
    }
    if (myBalance <= 0) {
        console.log("Insufficient funds!");
    } else {
        await mainMenu(); // Return to main menu after the operation
    }
}

//////////////////////TRANSFER FUNDS////////////////////////////////////
async function transferFunds(): Promise<void> {
        let transferAns = await inquirer.prompt(
            [
                {
                    name: "amount",
                    type: "number",
                    message: "Enter amount to transfer!"
                },
                {
                    name: "account",
                    type: "input",
                    message: "Enter account number to transfer to:"
                }
            ]
        );

        if (transferAns.amount > myBalance) {
            console.log("Insufficient funds!");
        } else {
            myBalance -= transferAns.amount;
            console.log('You have successfully transferd: $' +transferAns.amount ); 
            console.log('To account number: ' +transferAns.account ); 
            console.log('Your current balance is: $' + myBalance );
        }
        if (myBalance <= 0) {
            console.log("Insufficient funds!");
        } else {
            await mainMenu(); // Return to main menu after the operation
        }
}
////////////////////CHECK BALANCE//////////////////////////////////////////
async function checkBalance() {
    console.log("Your balance is: $" + myBalance );
    await mainMenu(); // Return to main menu after the operation
}
////////////////////EXIT////////////////////////////////////////////////////
async function exit(): Promise<void> {
    {
        console.log("Thank you for using ZB Bank ATM. See you soon!");
    }
    await mainMenu(); // Return to main menu on invalid choice
}

// Start the program by asking for the PIN code
inputPinCode();
