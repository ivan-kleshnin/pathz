let R = require("@paqmind/ramda")
let eq = require("assert").deepStrictEqual
let P1 = require("../posix").default
let P2 = require("../win32").default
let P = require("..").default

describe("index.js", () => {
  it("P, P1, P2 export the same API", () => {
    let pk = R.keys(P)
    let p1k = R.keys(P1)
    let p2k = R.keys(P2)

    eq(pk, p1k)
    eq(p1k, p2k)
  })
})
