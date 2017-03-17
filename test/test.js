let {padPath, padNumeric} = require('../index.js');

console.log(padPath(4, "0.a.1"));

// curry((w, s) => pipe(split("."), map(padNumeric(w)), join("."))(s))

// let pad = curry((z, w, s) => {
//         return (z.repeat(w) + s).slice(s.length)
// })
