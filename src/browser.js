import P from "path"
import {makeHelpers} from "./index"

export default makeHelpers(Object.assign({}, P, {
  sep: "/",
  delimiter: ":",
}))
