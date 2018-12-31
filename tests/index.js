import * as R from "@paqmind/ramdax"
import {deepStrictEqual as eq} from "assert"
import P1 from "../src/posix"
import P2 from "../src/win32"
import P from "../src"

describe("index.js", () => {
  it("P, P1, P2 export the same API", () => {
    let pk = R.keys(P)
    let p1k = R.keys(P1)
    let p2k = R.keys(P2)

    eq(pk, p1k)
    eq(p1k, p2k)
  })
})
