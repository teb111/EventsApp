const generatePassword = () => {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let passwordLength = 6;
    let password = "";

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password
}

module.exports = generatePassword