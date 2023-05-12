// This takes the initial prompt input and redirects to dispense the related info
const promptReroute = (response) => {
    // Used for testing purposes, will delete when no longer needed
    console.log(response);
    if (response.mainPrompt === "View All Departments") {
        console.log("You selected: " + response.mainPrompt)
        return "TEST REROUTING";
    }
    else if (response.mainPrompt === "View All Roles") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View All Employees") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Add A Department") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Add A Role") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Add An Employee") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Update An Employee Role") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Update Employee Managers") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Employees (By Manager)") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Employees (By Department)") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Delete Departments") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Delete Roles") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "Delete Employees") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Total Budget") {
        console.log("You selected: " + response.mainPrompt)
    }
    else if (response.mainPrompt === "View Budget (By Department)") {
        console.log("You selected: " + response.mainPrompt)
    }
    else {
        console.log(err);
    }
};

// Allows this function to be imported on other files
module.exports = promptReroute;