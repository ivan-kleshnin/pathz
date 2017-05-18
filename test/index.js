let eq = require("assert").deepStrictEqual
let P = require("../index")

describe("index.js", () => {
  describe("leftDir()", () => {
    it("should get the leftmost path dir", () => {
        eq("home", P.leftDir("home/user/dir/file.txt"))
      }
    )
  })

  describe("rightDir()", () => {
    it("should get the righmost path dir", () => {
        eq("dir", P.rightDir("home/user/dir/file.txt"))
      }
    )
  })

  describe("addRightDir()", () => {
    it("should add the rightmost path dir", () => {
        eq("home/user/dir/test/file.txt", P.addRightDir("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("addLeftDir()", () => {
    it("should add the leftmost path dir", () => {
        eq("test/home/user/dir/file.txt", P.addLeftDir("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("dropLeftDir()", () => {
    it("should drop the leftmost path dir", () => {
        eq("user/dir/file.txt", P.dropLeftDir("home/user/dir/file.txt"))
      }
    )
  })

  describe("dropRightDir()", () => {
    it("should drop the rightmost path dir", () => {
        eq("home/user/file.txt", P.dropRightDir("home/user/dir/file.txt"))
      }
    )
  })

  describe("withLeftDir()", () => {
    it("should set the leftmost path dir", () => {
        eq("test/user/dir/file.txt", P.withLeftDir("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("withRightDir()", () => {
    it("should set the rightmost path dir", () => {
        eq("home/user/test/file.txt", P.withRightDir("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("withDir()", () => {
    it("should set the path dir", () => {
        eq("test/file.txt", P.withDir("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("withBase()", () => {
    it("should set the path base", () => {
        eq("home/user/dir/test", P.withBase("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("withName()", () => {
    it("should set the path name", () => {
        eq("home/user/dir/test.txt", P.withName("test", "home/user/dir/file.txt"))
      }
    )
  })

  describe("withExt()", () => {
    it("should set the path ext", () => {
        eq("home/user/dir/file.js", P.withExt(".js", "home/user/dir/file.txt"))
      }
    )
  })

  describe("dropBase()", () => {
    it("should drop the path base", () => {
        eq("home/user/dir/", P.dropBase("home/user/dir/file.txt"))
      }
    )
  })

  describe("dropExt()", () => {
    it("should drop the path ext", () => {
        eq("home/user/dir/file", P.dropExt("home/user/dir/file.txt"))
      }
    )
  })
})


