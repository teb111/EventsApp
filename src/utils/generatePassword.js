const crypto = require("crypto").webcrypto;

const generatePassword = () => {
    let password;
    const randomPass = crypto.getRandomValues(new Uint8Array(8));
    let newPass = randomPass.toString()
    password = newPass.replace(/[^\w\s]/gi, '').slice(0, 8);
    return password;
}

module.exports = generatePassword