let R = require("@paqmind/ramda")
let eq = require("assert").deepStrictEqual
let P = require("../win32").default

describe("WINDOWS", () => {
  describe("dir()", () => {
    it("gets the dir for a relative file path", () => {
      eq(P.dir("foo\\bar\\baz"), "foo\\bar\\")
    })

    it("gets the dir for a relative dir path", () => {
      eq(P.dir("foo\\bar\\baz\\"), "foo\\bar\\baz\\")
    })

    it("gets the dir for an absolute file path", () => {
      eq(P.dir("C:\\foo\\bar\\baz"), "C:\\foo\\bar\\")
    })

    it("gets the dir for an absolute dir path", () => {
      eq(P.dir("C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\")
    })
  })

  describe("splitDirs()", () => {
    it("gets the dirs for a relative file path", () => {
      eq(P.splitDirs("foo\\bar\\baz"), ["foo", "bar"])
    })

    it("gets the dirs for a relative dir path", () => {
      eq(P.splitDirs("foo\\bar\\"), ["foo", "bar"])
    })

    it("gets the dirs for an absolute file path", () => {
      eq(P.splitDirs("\\foo\\bar\\baz"), ["foo", "bar"])
    })

    it("gets the dirs for an absolute dir path", () => {
      eq(P.splitDirs("\\foo\\bar\\"), ["foo", "bar"])
    })
  })

  describe("base()", () => {
    it("gets the base for a relative file path", () => {
      eq(P.base("foo\\bar\\baz.txt"), "baz.txt")
    })

    it("gets the base for a relative dir path", () => {
      eq(P.base("foo\\bar\\"), "")
    })

    it("gets the base for an absolute file path", () => {
      eq(P.base("C:\\foo\\bar\\baz.txt"), "baz.txt")
    })

    it("gets the base for an absolute dir path", () => {
      eq(P.base("C:\\foo\\bar\\"), "")
    })
  })

  describe("name()", () => {
    it("gets the name for a relative file path", () => {
      eq(P.name("foo\\bar\\baz.txt"), "baz")
    })

    it("gets the name for a relative dir path", () => {
      eq(P.name("foo\\bar\\"), "")
    })

    it("gets the name for an absolute file path", () => {
      eq(P.name("C:\\foo\\bar\\baz.txt"), "baz")
    })

    it("gets the name for an absolute dir path", () => {
      eq(P.name("C:\\foo\\bar\\"), "")
    })
  })

  describe("ext()", () => {
    it("gets the ext for a relative file path", () => {
      eq(P.ext("foo\\bar\\baz.txt"), ".txt")
    })

    it("gets the ext for a relative dir path", () => {
      eq(P.ext("foo\\bar\\"), "")
    })

    it("gets the ext for an absolute file path", () => {
      eq(P.ext("C:\\foo\\bar\\baz.txt"), ".txt")
    })

    it("gets the ext for an absolute dir path", () => {
      eq(P.ext("C:\\foo\\bar\\"), "")
    })
  })

  describe("leftDir()", () => {
    it("gets the leftmost dir for a relative file path", () => {
      eq(P.leftDir("foo\\bar\\baz"), "foo")
    })

    it("gets the leftmost dir for a relative dir path", () => {
      eq(P.leftDir("foo\\bar\\baz\\"), "foo")
    })

    it("gets the leftmost dir for an absolute file path", () => {
      eq(P.leftDir("C:\\foo\\bar\\baz"), "foo")
    })

    it("gets the leftmost dir for an absolute dir path", () => {
      eq(P.leftDir("C:\\foo\\bar\\baz\\"), "foo")
    })
  })

  describe("rightDir()", () => {
    it("gets the righmost dir for a relative file path", () => {
      eq(P.rightDir("foo\\bar\\baz"), "bar")
    })

    it("gets the righmost dir for a relative dir path", () => {
      eq(P.rightDir("foo\\bar\\baz\\"), "baz")
    })

    it("gets the righmost dir for an absolute file path", () => {
      eq(P.rightDir("C:\\foo\\bar\\baz"), "bar")
    })

    it("gets the righmost dir for an absolute dir path", () => {
      eq(P.rightDir("C:\\foo\\bar\\baz\\"), "baz")
    })
  })

  describe("leftDirs()", () => {
    it("gets at most N left dirs for relative file paths", () => {
      eq(P.leftDirs(1, "foo\\bar\\baz"), "foo")
      eq(P.leftDirs(2, "foo\\bar\\baz"), "foo\\bar")
      eq(P.leftDirs(3, "foo\\bar\\baz"), "foo\\bar")
    })

    it("gets at most N left dirs for relative dir paths", () => {
      eq(P.leftDirs(1, "foo\\bar\\baz\\"), "foo")
      eq(P.leftDirs(2, "foo\\bar\\baz\\"), "foo\\bar")
      eq(P.leftDirs(3, "foo\\bar\\baz\\"), "foo\\bar\\baz")
      eq(P.leftDirs(4, "foo\\bar\\baz\\"), "foo\\bar\\baz")
    })

    it("gets at most N left dirs for absolute file paths", () => {
      eq(P.leftDirs(1, "C:\\foo\\bar\\baz"), "foo")
      eq(P.leftDirs(2, "C:\\foo\\bar\\baz"), "foo\\bar")
      eq(P.leftDirs(3, "C:\\foo\\bar\\baz"), "foo\\bar")
    })

    it("gets at most N left dirs for absolute dir paths", () => {
      eq(P.leftDirs(1, "C:\\foo\\bar\\baz\\"), "foo")
      eq(P.leftDirs(2, "C:\\foo\\bar\\baz\\"), "foo\\bar")
      eq(P.leftDirs(3, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
      eq(P.leftDirs(4, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
    })
  })

  describe("rightDirs()", () => {
    it("gets at most N right dirs for relative file paths", () => {
      eq(P.rightDirs(1, "foo\\bar\\baz"), "bar")
      eq(P.rightDirs(2, "foo\\bar\\baz"), "foo\\bar")
      eq(P.rightDirs(3, "foo\\bar\\baz"), "foo\\bar")
    })

    it("gets at most N right dirs for relative dir paths", () => {
      eq(P.rightDirs(1, "foo\\bar\\baz\\"), "baz")
      eq(P.rightDirs(2, "foo\\bar\\baz\\"), "bar\\baz")
      eq(P.rightDirs(3, "foo\\bar\\baz\\"), "foo\\bar\\baz")
      eq(P.rightDirs(4, "foo\\bar\\baz\\"), "foo\\bar\\baz")
    })

    it("gets at most N right dirs for absolute file paths", () => {
      eq(P.rightDirs(1, "C:\\foo\\bar\\baz"), "bar")
      eq(P.rightDirs(2, "C:\\foo\\bar\\baz"), "foo\\bar")
      eq(P.rightDirs(3, "C:\\foo\\bar\\baz"), "foo\\bar")
    })

    it("gets at most N right dirs for absolute dir paths", () => {
      eq(P.rightDirs(1, "C:\\foo\\bar\\baz\\"), "baz")
      eq(P.rightDirs(2, "C:\\foo\\bar\\baz\\"), "bar\\baz")
      eq(P.rightDirs(3, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
      eq(P.rightDirs(4, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
    })
  })

  describe("addLeftDir()", () => {
    it("adds the leftmost dir for a relative file path", () => {
      eq(P.addLeftDir("bar", "foo\\baz"), "bar\\foo\\baz")
    })

    it("adds the leftmost dir for a relative dir path", () => {
      eq(P.addLeftDir("bar", "foo\\baz\\"), "bar\\foo\\baz\\")
    })

    it("adds the leftmost dir for an absolute file path", () => {
      eq(P.addLeftDir("bar", "C:\\foo\\baz"), "C:\\bar\\foo\\baz")
    })

    it("adds the leftmost dir for an absolute dir path", () => {
      eq(P.addLeftDir("bar", "C:\\foo\\baz\\"), "C:\\bar\\foo\\baz\\")
    })
  })

  describe("addRightDir()", () => {
    it("adds the rightmost dir for a relative file path", () => {
      eq(P.addRightDir("bar", "foo\\baz"), "foo\\bar\\baz")
    })

    it("adds the rightmost dir for a relative dir path", () => {
      eq(P.addRightDir("bar", "foo\\baz\\"), "foo\\baz\\bar\\")
    })

    it("adds the rightmost dir for an absolute file path", () => {
      eq(P.addRightDir("bar", "C:\\foo\\baz"), "C:\\foo\\bar\\baz")
    })

    it("adds the rightmost dir for an absolute dir path", () => {
      eq(P.addRightDir("bar", "C:\\foo\\baz\\"), "C:\\foo\\baz\\bar\\")
    })
  })

  describe("dropLeftDir()", () => {
    it("drops the leftmost dir for a relative file path", () => {
      eq(P.dropLeftDir("foo\\bar\\baz"), "bar\\baz")
    })

    it("drops the leftmost dir for a relative dir path", () => {
      eq(P.dropLeftDir("foo\\bar\\baz\\"), "bar\\baz\\")
    })

    it("drops the leftmost dir for an absolute file path", () => {
      eq(P.dropLeftDir("C:\\foo\\bar\\baz"), "C:\\bar\\baz")
    })

    it("drops the leftmost dir for an absolute dir path", () => {
      eq(P.dropLeftDir("C:\\foo\\bar\\baz\\"), "C:\\bar\\baz\\")
    })
  })

  describe("dropRightDir()", () => {
    it("drops the rightmost dir for a relative file path", () => {
      eq(P.dropRightDir("foo\\bar\\baz"), "foo\\baz")
    })

    it("drops the rightmost dir for a relative dir path", () => {
      eq(P.dropRightDir("foo\\bar\\baz\\"), "foo\\bar\\")
    })

    it("drops the rightmost dir for an absolute file path", () => {
      eq(P.dropRightDir("C:\\foo\\bar\\baz"), "C:\\foo\\baz")
    })

    it("drops the rightmost dir for an absolute dir path", () => {
      eq(P.dropRightDir("C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\")
    })
  })

  describe("withLeftDir()", () => {
    it("sets the leftmost dir for a relative file path", () => {
      eq(P.withLeftDir("qux", "foo\\bar\\baz"), "qux\\bar\\baz")
    })

    it("sets the leftmost dir for a relative dir path", () => {
      eq(P.withLeftDir("qux", "foo\\bar\\baz\\"), "qux\\bar\\baz\\")
    })

    it("sets the leftmost dir for an absolute file path", () => {
      eq(P.withLeftDir("qux", "C:\\foo\\bar\\baz"), "C:\\qux\\bar\\baz")
    })

    it("sets the leftmost dir for an absolute dir path", () => {
      eq(P.withLeftDir("qux", "C:\\foo\\bar\\baz\\"), "C:\\qux\\bar\\baz\\")
    })
  })

  describe("withRightDir()", () => {
    it("sets the rightmost dir for a relative file path", () => {
      eq(P.withRightDir("qux", "foo\\bar\\baz"), "foo\\qux\\baz")
    })

    it("sets the rightmost dir for a relative dir path", () => {
      eq(P.withRightDir("qux", "foo\\bar\\baz\\"), "foo\\bar\\qux\\")
    })

    it("sets the rightmost dir for an absolute file path", () => {
      eq(P.withRightDir("qux", "C:\\foo\\bar\\baz"), "C:\\foo\\qux\\baz")
    })

    it("sets the rightmost dir for an absolute dir path", () => {
      eq(P.withRightDir("qux", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\qux\\")
    })
  })

  describe("withDir()", () => {
    it("sets the dir for a relative file path", () => {
      eq(P.withDir("qux", "foo\\bar\\baz"), "qux\\baz")
    })

    it("sets the dir for a relative dir path", () => {
      eq(P.withDir("qux", "foo\\bar\\baz\\"), "qux\\")
    })

    it("sets the dir for an absolute file path", () => {
      eq(P.withDir("qux", "C:\\foo\\bar\\baz"), "C:\\qux\\baz")
    })

    it("sets the dir for an absolute dir path", () => {
      eq(P.withDir("qux", "C:\\foo\\bar\\baz\\"), "C:\\qux\\")
    })
  })

  describe("withBase()", () => {
    it("sets the base for a relative file path", () => {
      eq(P.withBase("qux.js", "foo\\bar\\baz.txt"), "foo\\bar\\qux.js")
    })

    it("sets the base for a relative dir path", () => {
      eq(P.withBase("qux.js", "foo\\bar\\baz\\"), "foo\\bar\\baz\\qux.js")
    })

    it("sets the base for an absolute file path", () => {
      eq(P.withBase("qux.js", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\qux.js")
    })

    it("sets the base for an absolute dir path", () => {
      eq(P.withBase("qux.js", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\qux.js")
    })
  })

  describe("withName()", () => {
    it("sets the name for a relative file path", () => {
      eq(P.withName("qux", "foo\\bar\\baz.txt"), "foo\\bar\\qux.txt")
    })

    it("sets the name for a relative dir path", () => {
      eq(P.withName("qux", "foo\\bar\\baz\\"), "foo\\bar\\baz\\qux")
    })

    it("sets the name for an absolute file path", () => {
      eq(P.withName("qux", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\qux.txt")
    })

    it("sets the name for an absolute dir path", () => {
      eq(P.withName("qux", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\qux")
    })
  })

  describe("withExt()", () => {
    it("sets the ext for a relative file path", () => {
      eq(P.withExt(".js", "foo\\bar\\baz.txt"), "foo\\bar\\baz.js")
    })

    it("sets the ext for a relative dir path", () => {
      eq(P.withExt(".js", "foo\\bar\\baz\\"), "foo\\bar\\baz\\.js")
    })

    it("sets the ext for an absolute file path", () => {
      eq(P.withExt(".js", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\baz.js")
    })

    it("sets the ext for an absolute dir path", () => {
      eq(P.withExt(".js", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\.js")
    })
  })

  describe("dropBase()", () => {
    it("drops the base for a relative file path", () => {
      eq(P.dropBase("foo\\bar\\baz.txt"), "foo\\bar\\")
    })

    it("drops the base for a relative dir path", () => {
      eq(P.dropBase("foo\\bar\\"), "foo\\bar\\")
    })

    it("drops the base for an absolute file path", () => {
      eq(P.dropBase("C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\")
    })

    it("drops the base for an absolute dir path", () => {
      eq(P.dropBase("C:\\foo\\bar\\"), "C:\\foo\\bar\\")
    })
  })

  describe("dropExt()", () => {
    it("drops the ext for a relative file path", () => {
      eq(P.dropExt("foo\\bar\\baz.txt"), "foo\\bar\\baz")
    })

    it("drops the ext for a relative dir path", () => {
      eq(P.dropExt("foo\\bar\\baz\\"), "foo\\bar\\baz\\")
    })

    it("drops the ext for an absolute file path", () => {
      eq(P.dropExt("C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\baz")
    })

    it("drops the ext for an absolute dir path", () => {
      eq(P.dropExt("C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\")
    })
  })

  describe("padNumeric()", () => {
    it("works", () => {
      eq(P.padNumeric(4, "x"), "x")
      eq(P.padNumeric(4, "1"), "0001")
    })
  })

  describe("padName()", () => {
    it("works", () => {
      eq(P.padName(2, "1.1.foo.js"), "01.01.foo.js")
    })
  })

  describe("padPath()", () => {
    it("works", () => {
      eq(P.padPath(2, "1.folder\\file.1.md"), "01.folder\\file.01.md")
    })
  })
})
