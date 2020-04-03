"use strict";

/********************* FUNCTIONS *********************/

//  FUNCTION TO GET USER INPUT
// ver 0.0
// function getOption() {
//     var readlineSync = require('readline-sync');
//     var option = readlineSync.question('> ');
//     return option
// }
// ver 2.0
//const getOption = (readlineSync = require('readline-sync')) => readlineSync.question('> ');
// ver 1.0
const getInput = (question) => {
    var readlineSync = require('readline-sync');
    return readlineSync.question(question);
};

// FUNCTION TO GET Y/n ANSWER
// ver 0.0
//const yesOrNo = (readlineSync = require('readline-sync')) => readlineSync.question('Please anwser Y (Yes) or n (No). ').toUpperCase();
// ver 1.0
const yesOrNo = (question) => {
    var readlineSync = require('readline-sync');

    let ans = getInput(question).toUpperCase();
    while (ans.length > 1 || (ans != 'N' && ans != 'Y')) {
        ans = getInput('Please anwser Y (Yes) or n (No). ').toUpperCase();
    }
    (ans == 'Y') ? ans = true: ans = false;
    return ans;
};

/********************* OBJECTS *********************/

// TASK CONSTRUCTOR
function Task(desc, dead = new Date(), urg = false, pri = true) {
    this.description = desc;
    this.deadline = dead;
    this.isUrgent = urg;
    this.isPrivate = pri;
}

var Menu = {
    option: '',
    printOptions: function() {
        console.log(`Hello! Welcome to todo_manager. You can:
    1. Insert a new task;
    2. Remove a task;
    3. Show all the tasks;
    4. Close the program;`);
    },
    askForInput: function() {
        this.option = getInput('> ');
    }
}

// CALENDAR PROTOTYPE
var Calendar = {
    name: '',
    appointments: new Map(),
    addTask: function(taskToManage) {
        if (this.appointments.has(taskToManage.description)) {
            console.log(`Already present!`);
        } else {
            this.appointments.set(taskToManage.description, taskToManage);
            // setTimeout()
            console.log(`Task added!`);
        }
    },
    removeTaskByDesc: function(taskDescription) {
        if (this.appointments.has(taskDescription)) {
            this.appointments.delete(taskDescription);
            console.log(`Task deleted!`);
        } else {
            console.log(`Task not found!`);
        }
    },
    removeTaskByDate: function(taskTimestamp) {
        let dateDay = new Date(taskTimestamp).getDate();
        for (let [d, a] of this.appointments.entries()) {
            let appointmentTimestamp = a.deadline.getTime();
            let appointmentDay = new Date(appointmentTimestamp).getDate();
            let diff = Math.abs(appointmentTimestamp - taskTimestamp);
            //if they are the same dom and their diff (timestamp) is less than 24H
            if (dateDay == appointmentDay && diff <= (60 * 60 * 24 * 1000)) {
                this.appointments.delete(d);
            }
        }
    },
    printAllTask: function() {
        console.log(`Here's the list of the tasks of ${this.name}'s calendar: `);
        const output = [];
        for (let [d, a] of this.appointments.entries())
            output.push(d); // output.push(`${d}`);
        output.sort();
        console.log(output);
    }
}

/********************* MAIN *********************/

var cal = Object.create(Calendar);
var men = Object.create(Menu);
cal.name = "Personal";
while (men.option != 4) {
    men.printOptions();
    men.askForInput();
    switch (Number(men.option)) {
        case 1:
            let desc = getInput("Please, provide the task description: "); //.toUpperCase();
            let urg = yesOrNo("Is it urgent? [Y/n] ");
            let pri = yesOrNo("Is it private? [Y/n] ");
            let dead = new Date(Date.parse(getInput("When do you want to schedule it? ")));
            cal.addTask(new Task(desc, dead, urg, pri));
            break;
        case 2:
            let ans = getInput("Do you want to delete it by Deadline (A) or Description (B)? ").toUpperCase();
            switch (ans) {
                case "A":
                    let dateTimestamp = Date.parse(getInput("Please, provide the task deadline: "));
                    cal.removeTaskByDate(dateTimestamp);
                    break;
                case "B":
                    let taskDescription = getInput("Please, provide the task description: "); //.toUpperCase();
                    cal.removeTaskByDesc(taskDescription);
                    break;
                default:
                    console.log("Sorry, you entered an invalid option. Please try again.");
                    break;
            }
            break;
        case 3:
            cal.printAllTask();
            break;
        case 4:
            console.log("Goodbye...!");
            return 0;
            break;
        default:
            console.log("Sorry, you entered an invalid option. Please try again.");
            break;
    }
}

/*
TESTING AREA...
    setInterval(this.askForInput, 1000);
    setOption: function(val) {
        this.option = val;
    },
    hasValidOption: function() {
        (this.option <= this.possibleOptions && this.option > 0) ? true: false;
    },
    const sayHello = () => { console.log("Hello!"); }

    setTimeout(sayHello, 1000);
    */