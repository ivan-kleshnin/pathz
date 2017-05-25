let eq = require("assert").deepStrictEqual
let P = require("../index")

describe("index.js", () => {
  describe("dir()", () => {
    it("should get the file dir", () => {
      eq("foo/bar/", P.dir("foo/bar/baz.txt"))
    })

    it("should identify folder", () => {
      eq("foo/bar/", P.dir("foo/bar/"))
    })
  })

  describe("base()", () => {
    it("should get the file base", () => {
      eq("baz.txt", P.base("foo/bar/baz.txt"))
    })

    it("should identify folder", () => {
      eq("", P.base("foo/bar/"))
    })
  })

  describe("leftDir()", () => {
    it("should get the leftmost dir", () => {
      eq("home", P.leftDir("home/user/dir/file.txt"))
    })
  })

  describe("rightDir()", () => {
    it("should get the righmost dir", () => {
      eq("dir", P.rightDir("home/user/dir/file.txt"))
    })
  })

  describe("addRightDir()", () => {
    it("should add the rightmost dir", () => {
      eq("home/user/dir/test/file.txt", P.addRightDir("test", "home/user/dir/file.txt"))
    })
  })

  describe("addLeftDir()", () => {
    it("should add the leftmost dir", () => {
      eq("test/home/user/dir/file.txt", P.addLeftDir("test", "home/user/dir/file.txt"))
    })
  })

  describe("dropLeftDir()", () => {
    it("should drop the leftmost dir", () => {
      eq("user/dir/file.txt", P.dropLeftDir("home/user/dir/file.txt"))
    })
  })

  describe("dropRightDir()", () => {
    it("should drop the rightmost dir", () => {
      eq("home/user/file.txt", P.dropRightDir("home/user/dir/file.txt"))
    })
  })

  describe("withLeftDir()", () => {
    it("should set the leftmost dir", () => {
      eq("test/user/dir/file.txt", P.withLeftDir("test", "home/user/dir/file.txt"))
    })
  })

  describe("withRightDir()", () => {
    it("should set the rightmost dir", () => {
      eq("home/user/test/file.txt", P.withRightDir("test", "home/user/dir/file.txt"))
    })
  })

  describe("withDir()", () => {
    it("should set the dir", () => {
      eq("test/file.txt", P.withDir("test", "home/user/dir/file.txt"))
    })
  })

  describe("withBase()", () => {
    it("should set the base", () => {
      eq("home/user/dir/test", P.withBase("test", "home/user/dir/file.txt"))
    })
  })

  describe("withName()", () => {
    it("should set the name", () => {
      eq("home/user/dir/test.txt", P.withName("test", "home/user/dir/file.txt"))
    })
  })

  describe("withExt()", () => {
    it("should set the ext", () => {
      eq("home/user/dir/file.js", P.withExt(".js", "home/user/dir/file.txt"))
    })
  })

  describe("dropBase()", () => {
    it("should drop the base", () => {
      eq("home/user/dir/", P.dropBase("home/user/dir/file.txt"))
    })
  })

  describe("dropExt()", () => {
    it("should drop the ext", () => {
      eq("home/user/dir/file", P.dropExt("home/user/dir/file.txt"))
    })
  })
})
