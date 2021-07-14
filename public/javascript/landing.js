
function validateInfo() {
    <%   console.log('hi') %>
    let username = document.getElementById("username").value;
    let uError = document.getElementById("usernameerror")
    let code = document.getElementById("roomcode").value;
    let cError = document.getElementById("roomcodeerror")
    if (username.length < 2) {
        uError.innerHTML = 'Username must be at-least 3 characters.'
    } else if (username.match(/[^\x00-\x7F]+/gi)) {
        uError.innerHTML = 'Invalid characters.'
    } else if (username[username.length - 1] === ' ' || username[0] === ' ') {
        uError.innerHTML = 'Username can\'t start or end with a space.'
    } else {
        uError.innerHTML = ' '
    }


    if (code.length < 10) {
        return cError.innerHTML = 'Invalid 10-character code.'
    } else {
        return cError.innerHTML = ''
    
    }
}

document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submitButton").click();
    }
});