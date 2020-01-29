function greeter(person :any) {
    return "Hello, " + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);