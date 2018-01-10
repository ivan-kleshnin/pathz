let eq = require("assert").deepStrictEqual
let P = require("../lib/index")

let P1 = P.posix
let P2 = P.win32

describe("index.js", () => {
  describe("POSIX", () => {
    describe("dir()", () => {
      it("gets the dir for a relative file path", () => {
        eq(P1.dir("foo/bar/baz.txt"), "foo/bar/")
      })

      it("gets the dir for a relative dir path", () => {
        eq(P1.dir("foo/bar/"), "foo/bar/")
      })

      it("gets the dir for an absolute file path", () => {
        eq(P1.dir("/foo/bar/baz.txt"), "/foo/bar/")
      })

      it("gets the dir for an absolute dir path", () => {
        eq(P1.dir("/foo/bar/"), "/foo/bar/")
      })
    })

    describe("splitDirs()", () => {
      it("gets the dirs for a relative file path", () => {
        eq(P1.splitDirs("foo/bar/baz.txt"), ["foo", "bar"])
      })

      it("gets the dirs for a relative dir path", () => {
        eq(P1.splitDirs("foo/bar/"), ["foo", "bar"])
      })

      it("gets the dirs for an absolute file path", () => {
        eq(P1.splitDirs("/foo/bar/baz.txt"), ["foo", "bar"])
      })

      it("gets the dirs for an absolute dir path", () => {
        eq(P1.splitDirs("/foo/bar/"), ["foo", "bar"])
      })
    })

    describe("base()", () => {
      it("gets the base for a relative file path", () => {
        eq(P1.base("foo/bar/baz.txt"), "baz.txt")
      })

      it("gets the base for a relative dir path", () => {
        eq(P1.base("foo/bar/"), "")
      })

      it("gets the base for an absolute file path", () => {
        eq(P1.base("/foo/bar/baz.txt"), "baz.txt")
      })

      it("gets the base for an absolute dir path", () => {
        eq(P1.base("/foo/bar/"), "")
      })
    })

    describe("leftDir()", () => {
      it("gets the leftmost dir for a relative file path", () => {
        eq(P1.leftDir("foo/bar/baz.txt"), "foo")
      })

      it("gets the leftmost dir for a relative dir path", () => {
        eq(P1.leftDir("foo/bar/baz/"), "foo")
      })

      it("gets the leftmost dir for an absolute file path", () => {
        eq(P1.leftDir("/foo/bar/baz.txt"), "foo")
      })

      it("gets the leftmost dir for an absolute dir path", () => {
        eq(P1.leftDir("/foo/bar/baz/"), "foo")
      })
    })

    describe("rightDir()", () => {
      it("gets the righmost dir for a relative file path", () => {
        eq(P1.rightDir("foo/bar/baz.txt"), "bar")
      })

      it("gets the righmost dir for a relative dir path", () => {
        eq(P1.rightDir("foo/bar/baz/"), "baz")
      })

      it("gets the righmost dir for an absolute file path", () => {
        eq(P1.rightDir("/foo/bar/baz.txt"), "bar")
      })

      it("gets the righmost dir for an absolute dir path", () => {
        eq(P1.rightDir("/foo/bar/baz/"), "baz")
      })
    })

    describe("leftDirs()", () => {
      it("gets at most N left dirs for relative file paths", () => {
        eq(P1.leftDirs(1, "foo/bar/baz.txt"), "foo")
        eq(P1.leftDirs(2, "foo/bar/baz.txt"), "foo/bar")
        eq(P1.leftDirs(3, "foo/bar/baz.txt"), "foo/bar")
      })

      it("gets at most N left dirs for relative dir paths", () => {
        eq(P1.leftDirs(1, "foo/bar/baz/"), "foo")
        eq(P1.leftDirs(2, "foo/bar/baz/"), "foo/bar")
        eq(P1.leftDirs(3, "foo/bar/baz/"), "foo/bar/baz")
        eq(P1.leftDirs(4, "foo/bar/baz/"), "foo/bar/baz")
      })

      it("gets at most N left dirs for absolute file paths", () => {
        eq(P1.leftDirs(1, "/foo/bar/baz.txt"), "foo")
        eq(P1.leftDirs(2, "/foo/bar/baz.txt"), "foo/bar")
        eq(P1.leftDirs(3, "/foo/bar/baz.txt"), "foo/bar")
      })

      it("gets at most N left dirs for absolute dir paths", () => {
        eq(P1.leftDirs(1, "/foo/bar/baz/"), "foo")
        eq(P1.leftDirs(2, "/foo/bar/baz/"), "foo/bar")
        eq(P1.leftDirs(3, "/foo/bar/baz/"), "foo/bar/baz")
        eq(P1.leftDirs(4, "/foo/bar/baz/"), "foo/bar/baz")
      })
    })

    describe("rightDirs()", () => {
      it("gets at most N right dirs for relative file paths", () => {
        eq(P1.rightDirs(1, "foo/bar/baz.txt"), "bar")
        eq(P1.rightDirs(2, "foo/bar/baz.txt"), "foo/bar")
        eq(P1.rightDirs(3, "foo/bar/baz.txt"), "foo/bar")
      })

      it("gets at most N right dirs for relative dir paths", () => {
        eq(P1.rightDirs(1, "foo/bar/baz/"), "baz")
        eq(P1.rightDirs(2, "foo/bar/baz/"), "bar/baz")
        eq(P1.rightDirs(3, "foo/bar/baz/"), "foo/bar/baz")
        eq(P1.rightDirs(4, "foo/bar/baz/"), "foo/bar/baz")
      })

      it("gets at most N right dirs for absolute file paths", () => {
        eq(P1.rightDirs(1, "/foo/bar/baz.txt"), "bar")
        eq(P1.rightDirs(2, "/foo/bar/baz.txt"), "foo/bar")
        eq(P1.rightDirs(3, "/foo/bar/baz.txt"), "foo/bar")
      })

      it("gets at most N right dirs for absolute dir paths", () => {
        eq(P1.rightDirs(1, "/foo/bar/baz/"), "baz")
        eq(P1.rightDirs(2, "/foo/bar/baz/"), "bar/baz")
        eq(P1.rightDirs(3, "/foo/bar/baz/"), "foo/bar/baz")
        eq(P1.rightDirs(4, "/foo/bar/baz/"), "foo/bar/baz")
      })
    })

    describe("addLeftDir()", () => {
      it("adds the leftmost dir for a relative file path", () => {
        eq(P1.addLeftDir("bar", "foo/baz.txt"), "bar/foo/baz.txt")
      })

      it("adds the leftmost dir for a relative dir path", () => {
        eq(P1.addLeftDir("bar", "foo/baz/"), "bar/foo/baz/")
      })

      it("adds the leftmost dir for an absolute file path", () => {
        eq(P1.addLeftDir("bar", "/foo/baz.txt"), "/bar/foo/baz.txt")
      })

      it("adds the leftmost dir for an absolute dir path", () => {
        eq(P1.addLeftDir("bar", "/foo/baz/"), "/bar/foo/baz/")
      })
    })

    describe("addRightDir()", () => {
      it("adds the rightmost dir for a relative file path", () => {
        eq(P1.addRightDir("bar", "foo/baz.txt"), "foo/bar/baz.txt")
      })

      it("adds the rightmost dir for a relative dir path", () => {
        eq(P1.addRightDir("bar", "foo/baz/"), "foo/baz/bar/")
      })

      it("adds the rightmost dir for an absolute file path", () => {
        eq(P1.addRightDir("bar", "/foo/baz.txt"), "/foo/bar/baz.txt")
      })

      it("adds the rightmost dir for an absolute dir path", () => {
        eq(P1.addRightDir("bar", "/foo/baz/"), "/foo/baz/bar/")
      })
    })

    describe("withLeftDir()", () => {
      it("sets the leftmost dir for a relative file path", () => {
        eq(P1.withLeftDir("qux", "foo/bar/baz.txt"), "qux/bar/baz.txt")
      })

      it("sets the leftmost dir for a relative dir path", () => {
        eq(P1.withLeftDir("qux", "foo/bar/baz/"), "qux/bar/baz/")
      })

      it("sets the leftmost dir for an absolute file path", () => {
        eq(P1.withLeftDir("qux", "/foo/bar/baz.txt"), "/qux/bar/baz.txt")
      })

      it("sets the leftmost dir for an absolute dir path", () => {
        eq(P1.withLeftDir("qux", "/foo/bar/baz/"), "/qux/bar/baz/")
      })
    })

    describe("withRightDir()", () => {
      it("sets the rightmost dir for a relative file path", () => {
        eq(P1.withRightDir("qux", "foo/bar/baz.txt"), "foo/qux/baz.txt")
      })

      it("sets the rightmost dir for a relative dir path", () => {
        eq(P1.withRightDir("qux", "foo/bar/baz/"), "foo/bar/qux/")
      })

      it("sets the rightmost dir for an absolute file path", () => {
        eq(P1.withRightDir("qux", "/foo/bar/baz.txt"), "/foo/qux/baz.txt")
      })

      it("sets the rightmost dir for an absolute dir path", () => {
        eq(P1.withRightDir("qux", "/foo/bar/baz/"), "/foo/bar/qux/")
      })
    })

    describe("dropLeftDir()", () => {
      it("drops the leftmost dir for a relative file path", () => {
        eq(P1.dropLeftDir("foo/bar/baz.txt"), "bar/baz.txt")
      })

      it("drops the leftmost dir for a relative dir path", () => {
        eq(P1.dropLeftDir("foo/bar/baz/"), "bar/baz/")
      })

      it("drops the leftmost dir for an absolute file path", () => {
        eq(P1.dropLeftDir("/foo/bar/baz.txt"), "/bar/baz.txt")
      })

      it("drops the leftmost dir for an absolute dir path", () => {
        eq(P1.dropLeftDir("/foo/bar/baz/"), "/bar/baz/")
      })
    })

    describe("dropRightDir()", () => {
      it("drops the rightmost dir for a relative file path", () => {
        eq(P1.dropRightDir("foo/bar/baz.txt"), "foo/baz.txt")
      })

      it("drops the rightmost dir for a relative dir path", () => {
        eq(P1.dropRightDir("foo/bar/baz/"), "foo/bar/")
      })

      it("drops the rightmost dir for an absolute file path", () => {
        eq(P1.dropRightDir("/foo/bar/baz.txt"), "/foo/baz.txt")
      })

      it("drops the rightmost dir for an absolute dir path", () => {
        eq(P1.dropRightDir("/foo/bar/baz/"), "/foo/bar/")
      })
    })

    describe("withDir()", () => {
      it("sets the dir for a relative file path", () => {
        eq(P1.withDir("qux", "foo/bar/baz.txt"), "qux/baz.txt")
      })

      it("sets the dir for a relative dir path", () => {
        eq(P1.withDir("qux", "foo/bar/baz/"), "qux/")
      })

      it("sets the dir for an absolute file path", () => {
        eq(P1.withDir("qux", "/foo/bar/baz.txt"), "/qux/baz.txt")
      })

      it("sets the dir for an absolute dir path", () => {
        eq(P1.withDir("qux", "/foo/bar/baz/"), "/qux/")
      })
    })

    describe("withBase()", () => {
      it("sets the base for a relative file path", () => {
        eq(P1.withBase("qux.js", "foo/bar/baz.txt"), "foo/bar/qux.js")
      })

      it("sets the base for a relative dir path", () => {
        eq(P1.withBase("qux.js", "foo/bar/baz/"), "foo/bar/baz/qux.js")
      })

      it("sets the base for an absolute file path", () => {
        eq(P1.withBase("qux.js", "/foo/bar/baz.txt"), "/foo/bar/qux.js")
      })

      it("sets the base for an absolute dir path", () => {
        eq(P1.withBase("qux.js", "/foo/bar/baz/"), "/foo/bar/baz/qux.js")
      })
    })

    describe("withName()", () => {
      it("sets the name for a relative file path", () => {
        eq(P1.withName("qux", "foo/bar/baz.txt"), "foo/bar/qux.txt")
      })

      it("sets the name for a relative dir path", () => {
        eq(P1.withName("qux", "foo/bar/baz/"), "foo/bar/baz/qux")
      })

      it("sets the name for an absolute file path", () => {
        eq(P1.withName("qux", "/foo/bar/baz.txt"), "/foo/bar/qux.txt")
      })

      it("sets the name for an absolute dir path", () => {
        eq(P1.withName("qux", "/foo/bar/baz/"), "/foo/bar/baz/qux")
      })
    })

    describe("withExt()", () => {
      it("sets the ext for a relative file path", () => {
        eq(P1.withExt(".js", "foo/bar/baz.txt"), "foo/bar/baz.js")
      })

      it("sets the ext for a relative dir path", () => {
        eq(P1.withExt(".js", "foo/bar/baz/"), "foo/bar/baz/.js")
      })

      it("sets the ext for an absolute file path", () => {
        eq(P1.withExt(".js", "/foo/bar/baz.txt"), "/foo/bar/baz.js")
      })

      it("sets the ext for an absolute dir path", () => {
        eq(P1.withExt(".js", "/foo/bar/baz/"), "/foo/bar/baz/.js")
      })
    })

    describe("dropBase()", () => {
      it("drops the base for a relative file path", () => {
        eq(P1.dropBase("foo/bar/baz.txt"), "foo/bar/")
      })

      it("drops the base for a relative dir path", () => {
        eq(P1.dropBase("foo/bar/"), "foo/bar/")
      })

      it("drops the base for an absolute file path", () => {
        eq(P1.dropBase("/foo/bar/baz.txt"), "/foo/bar/")
      })

      it("drops the base for an absolute dir path", () => {
        eq(P1.dropBase("/foo/bar/"), "/foo/bar/")
      })
    })

    describe("dropExt()", () => {
      it("drops the ext for a relative file path", () => {
        eq(P1.dropExt("foo/bar/baz.txt"), "foo/bar/baz")
      })

      it("drops the ext for a relative dir path", () => {
        eq(P1.dropExt("foo/bar/baz/"), "foo/bar/baz/")
      })

      it("drops the ext for an absolute file path", () => {
        eq(P1.dropExt("/foo/bar/baz.txt"), "/foo/bar/baz")
      })

      it("drops the ext for an absolute dir path", () => {
        eq(P1.dropExt("/foo/bar/baz/"), "/foo/bar/baz/")
      })
    })

    describe("padNumeric()", () => {
      it("works", () => {
        eq(P1.padNumeric(4, "x"), "x")
        eq(P1.padNumeric(4, "1"), "0001")
      })
    })

    describe("padName()", () => {
      it("works", () => {
        eq(P1.padName(2, "1.1.foo.js"), "01.01.foo.js")
      })
    })

    describe("padPath()", () => {
      it("works", () => {
        eq(P1.padPath(2, "1.folder/file.1.md"), "01.folder/file.01.md")
      })
    })
  })

  describe("WINDOWS", () => {
    describe("dir()", () => {
      it("gets the dir for a relative file path", () => {
        eq(P2.dir("foo\\bar\\baz.txt"), "foo\\bar\\")
      })

      it("gets the dir for a relative dir path", () => {
        eq(P2.dir("foo\\bar\\"), "foo\\bar\\")
      })

      it("gets the dir for an absolute file path", () => {
        eq(P2.dir("C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\")
      })

      it("gets the dir for an absolute dir path", () => {
        eq(P2.dir("C:\\foo\\bar\\"), "C:\\foo\\bar\\")
      })
    })

    describe("splitDirs()", () => {
      it("gets the dirs for a relative file path", () => {
        eq(P2.splitDirs("foo\\bar\\baz.txt"), ["foo", "bar"])
      })

      it("gets the dirs for a relative dir path", () => {
        eq(P2.splitDirs("foo\\bar\\"), ["foo", "bar"])
      })

      it("gets the dirs for an absolute file path", () => {
        eq(P2.splitDirs("\\foo\\bar\\baz.txt"), ["foo", "bar"])
      })

      it("gets the dirs for an absolute dir path", () => {
        eq(P2.splitDirs("\\foo\\bar\\"), ["foo", "bar"])
      })
    })

    describe("base()", () => {
      it("gets the base for a relative file path", () => {
        eq(P2.base("foo\\bar\\baz.txt"), "baz.txt")
      })

      it("gets the base for a relative dir path", () => {
        eq(P2.base("foo\\bar\\"), "")
      })

      it("gets the base for an absolute file path", () => {
        eq(P2.base("C:\\foo\\bar\\baz.txt"), "baz.txt")
      })

      it("gets the base for an absolute dir path", () => {
        eq(P2.base("C:\\foo\\bar\\"), "")
      })
    })

    describe("leftDir()", () => {
      it("gets the leftmost dir for a relative file path", () => {
        eq(P2.leftDir("foo\\bar\\baz.txt"), "foo")
      })

      it("gets the leftmost dir for a relative dir path", () => {
        eq(P2.leftDir("foo\\bar\\baz\\"), "foo")
      })

      it("gets the leftmost dir for an absolute file path", () => {
        eq(P2.leftDir("C:\\foo\\bar\\baz.txt"), "foo")
      })

      it("gets the leftmost dir for an absolute dir path", () => {
        eq(P2.leftDir("C:\\foo\\bar\\baz\\"), "foo")
      })
    })

    describe("rightDir()", () => {
      it("gets the righmost dir for a relative file path", () => {
        eq(P2.rightDir("foo\\bar\\baz.txt"), "bar")
      })

      it("gets the righmost dir for a relative dir path", () => {
        eq(P2.rightDir("foo\\bar\\baz\\"), "baz")
      })

      it("gets the righmost dir for an absolute file path", () => {
        eq(P2.rightDir("C:\\foo\\bar\\baz.txt"), "bar")
      })

      it("gets the righmost dir for an absolute dir path", () => {
        eq(P2.rightDir("C:\\foo\\bar\\baz\\"), "baz")
      })
    })

    describe("leftDirs()", () => {
      it("gets at most N left dirs for relative file paths", () => {
        eq(P2.leftDirs(1, "foo\\bar\\baz.txt"), "foo")
        eq(P2.leftDirs(2, "foo\\bar\\baz.txt"), "foo\\bar")
        eq(P2.leftDirs(3, "foo\\bar\\baz.txt"), "foo\\bar")
      })

      it("gets at most N left dirs for relative dir paths", () => {
        eq(P2.leftDirs(1, "foo\\bar\\baz\\"), "foo")
        eq(P2.leftDirs(2, "foo\\bar\\baz\\"), "foo\\bar")
        eq(P2.leftDirs(3, "foo\\bar\\baz\\"), "foo\\bar\\baz")
        eq(P2.leftDirs(4, "foo\\bar\\baz\\"), "foo\\bar\\baz")
      })

      it("gets at most N left dirs for absolute file paths", () => {
        eq(P2.leftDirs(1, "C:\\foo\\bar\\baz.txt"), "foo")
        eq(P2.leftDirs(2, "C:\\foo\\bar\\baz.txt"), "foo\\bar")
        eq(P2.leftDirs(3, "C:\\foo\\bar\\baz.txt"), "foo\\bar")
      })

      it("gets at most N left dirs for absolute dir paths", () => {
        eq(P2.leftDirs(1, "C:\\foo\\bar\\baz\\"), "foo")
        eq(P2.leftDirs(2, "C:\\foo\\bar\\baz\\"), "foo\\bar")
        eq(P2.leftDirs(3, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
        eq(P2.leftDirs(4, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
      })
    })

    describe("rightDirs()", () => {
      it("gets at most N right dirs for relative file paths", () => {
        eq(P2.rightDirs(1, "foo\\bar\\baz.txt"), "bar")
        eq(P2.rightDirs(2, "foo\\bar\\baz.txt"), "foo\\bar")
        eq(P2.rightDirs(3, "foo\\bar\\baz.txt"), "foo\\bar")
      })

      it("gets at most N right dirs for relative dir paths", () => {
        eq(P2.rightDirs(1, "foo\\bar\\baz\\"), "baz")
        eq(P2.rightDirs(2, "foo\\bar\\baz\\"), "bar\\baz")
        eq(P2.rightDirs(3, "foo\\bar\\baz\\"), "foo\\bar\\baz")
        eq(P2.rightDirs(4, "foo\\bar\\baz\\"), "foo\\bar\\baz")
      })

      it("gets at most N right dirs for absolute file paths", () => {
        eq(P2.rightDirs(1, "C:\\foo\\bar\\baz.txt"), "bar")
        eq(P2.rightDirs(2, "C:\\foo\\bar\\baz.txt"), "foo\\bar")
        eq(P2.rightDirs(3, "C:\\foo\\bar\\baz.txt"), "foo\\bar")
      })

      it("gets at most N right dirs for absolute dir paths", () => {
        eq(P2.rightDirs(1, "C:\\foo\\bar\\baz\\"), "baz")
        eq(P2.rightDirs(2, "C:\\foo\\bar\\baz\\"), "bar\\baz")
        eq(P2.rightDirs(3, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
        eq(P2.rightDirs(4, "C:\\foo\\bar\\baz\\"), "foo\\bar\\baz")
      })
    })

    describe("addLeftDir()", () => {
      it("adds the leftmost dir for a relative file path", () => {
        eq(P2.addLeftDir("bar", "foo\\baz.txt"), "bar\\foo\\baz.txt")
      })

      it("adds the leftmost dir for a relative dir path", () => {
        eq(P2.addLeftDir("bar", "foo\\baz\\"), "bar\\foo\\baz\\")
      })

      it("adds the leftmost dir for an absolute file path", () => {
        eq(P2.addLeftDir("bar", "C:\\foo\\baz.txt"), "C:\\bar\\foo\\baz.txt")
      })

      it("adds the leftmost dir for an absolute dir path", () => {
        eq(P2.addLeftDir("bar", "C:\\foo\\baz\\"), "C:\\bar\\foo\\baz\\")
      })
    })

    describe("addRightDir()", () => {
      it("adds the rightmost dir for a relative file path", () => {
        eq(P2.addRightDir("bar", "foo\\baz.txt"), "foo\\bar\\baz.txt")
      })

      it("adds the rightmost dir for a relative dir path", () => {
        eq(P2.addRightDir("bar", "foo\\baz\\"), "foo\\baz\\bar\\")
      })

      it("adds the rightmost dir for an absolute file path", () => {
        eq(P2.addRightDir("bar", "C:\\foo\\baz.txt"), "C:\\foo\\bar\\baz.txt")
      })

      it("adds the rightmost dir for an absolute dir path", () => {
        eq(P2.addRightDir("bar", "C:\\foo\\baz\\"), "C:\\foo\\baz\\bar\\")
      })
    })

    describe("withLeftDir()", () => {
      it("sets the leftmost dir for a relative file path", () => {
        eq(P2.withLeftDir("qux", "foo\\bar\\baz.txt"), "qux\\bar\\baz.txt")
      })

      it("sets the leftmost dir for a relative dir path", () => {
        eq(P2.withLeftDir("qux", "foo\\bar\\baz\\"), "qux\\bar\\baz\\")
      })

      it("sets the leftmost dir for an absolute file path", () => {
        eq(P2.withLeftDir("qux", "C:\\foo\\bar\\baz.txt"), "C:\\qux\\bar\\baz.txt")
      })

      it("sets the leftmost dir for an absolute dir path", () => {
        eq(P2.withLeftDir("qux", "C:\\foo\\bar\\baz\\"), "C:\\qux\\bar\\baz\\")
      })
    })

    describe("withRightDir()", () => {
      it("sets the rightmost dir for a relative file path", () => {
        eq(P2.withRightDir("qux", "foo\\bar\\baz.txt"), "foo\\qux\\baz.txt")
      })

      it("sets the rightmost dir for a relative dir path", () => {
        eq(P2.withRightDir("qux", "foo\\bar\\baz\\"), "foo\\bar\\qux\\")
      })

      it("sets the rightmost dir for an absolute file path", () => {
        eq(P2.withRightDir("qux", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\qux\\baz.txt")
      })

      it("sets the rightmost dir for an absolute dir path", () => {
        eq(P2.withRightDir("qux", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\qux\\")
      })
    })

    describe("dropLeftDir()", () => {
      it("drops the leftmost dir for a relative file path", () => {
        eq(P2.dropLeftDir("foo\\bar\\baz.txt"), "bar\\baz.txt")
      })

      it("drops the leftmost dir for a relative dir path", () => {
        eq(P2.dropLeftDir("foo\\bar\\baz\\"), "bar\\baz\\")
      })

      it("drops the leftmost dir for an absolute file path", () => {
        eq(P2.dropLeftDir("C:\\foo\\bar\\baz.txt"), "C:\\bar\\baz.txt")
      })

      it("drops the leftmost dir for an absolute dir path", () => {
        eq(P2.dropLeftDir("C:\\foo\\bar\\baz\\"), "C:\\bar\\baz\\")
      })
    })

    describe("dropRightDir()", () => {
      it("drops the rightmost dir for a relative file path", () => {
        eq(P2.dropRightDir("foo\\bar\\baz.txt"), "foo\\baz.txt")
      })

      it("drops the rightmost dir for a relative dir path", () => {
        eq(P2.dropRightDir("foo\\bar\\baz\\"), "foo\\bar\\")
      })

      it("drops the rightmost dir for an absolute file path", () => {
        eq(P2.dropRightDir("C:\\foo\\bar\\baz.txt"), "C:\\foo\\baz.txt")
      })

      it("drops the rightmost dir for an absolute dir path", () => {
        eq(P2.dropRightDir("C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\")
      })
    })

    describe("withDir()", () => {
      it("sets the dir for a relative file path", () => {
        eq(P2.withDir("qux", "foo\\bar\\baz.txt"), "qux\\baz.txt")
      })

      it("sets the dir for a relative dir path", () => {
        eq(P2.withDir("qux", "foo\\bar\\baz\\"), "qux\\")
      })

      it("sets the dir for an absolute file path", () => {
        eq(P2.withDir("qux", "C:\\foo\\bar\\baz.txt"), "C:\\qux\\baz.txt")
      })

      it("sets the dir for an absolute dir path", () => {
        eq(P2.withDir("qux", "C:\\foo\\bar\\baz\\"), "C:\\qux\\")
      })
    })

    describe("withBase()", () => {
      it("sets the base for a relative file path", () => {
        eq(P2.withBase("qux.js", "foo\\bar\\baz.txt"), "foo\\bar\\qux.js")
      })

      it("sets the base for a relative dir path", () => {
        eq(P2.withBase("qux.js", "foo\\bar\\baz\\"), "foo\\bar\\baz\\qux.js")
      })

      it("sets the base for an absolute file path", () => {
        eq(P2.withBase("qux.js", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\qux.js")
      })

      it("sets the base for an absolute dir path", () => {
        eq(P2.withBase("qux.js", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\qux.js")
      })
    })

    describe("withName()", () => {
      it("sets the name for a relative file path", () => {
        eq(P2.withName("qux", "foo\\bar\\baz.txt"), "foo\\bar\\qux.txt")
      })

      it("sets the name for a relative dir path", () => {
        eq(P2.withName("qux", "foo\\bar\\baz\\"), "foo\\bar\\baz\\qux")
      })

      it("sets the name for an absolute file path", () => {
        eq(P2.withName("qux", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\qux.txt")
      })

      it("sets the name for an absolute dir path", () => {
        eq(P2.withName("qux", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\qux")
      })
    })

    describe("withExt()", () => {
      it("sets the ext for a relative file path", () => {
        eq(P2.withExt(".js", "foo\\bar\\baz.txt"), "foo\\bar\\baz.js")
      })

      it("sets the ext for a relative dir path", () => {
        eq(P2.withExt(".js", "foo\\bar\\baz\\"), "foo\\bar\\baz\\.js")
      })

      it("sets the ext for an absolute file path", () => {
        eq(P2.withExt(".js", "C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\baz.js")
      })

      it("sets the ext for an absolute dir path", () => {
        eq(P2.withExt(".js", "C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\.js")
      })
    })

    describe("dropBase()", () => {
      it("drops the base for a relative file path", () => {
        eq(P2.dropBase("foo\\bar\\baz.txt"), "foo\\bar\\")
      })

      it("drops the base for a relative dir path", () => {
        eq(P2.dropBase("foo\\bar\\"), "foo\\bar\\")
      })

      it("drops the base for an absolute file path", () => {
        eq(P2.dropBase("C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\")
      })

      it("drops the base for an absolute dir path", () => {
        eq(P2.dropBase("C:\\foo\\bar\\"), "C:\\foo\\bar\\")
      })
    })

    describe("dropExt()", () => {
      it("drops the ext for a relative file path", () => {
        eq(P2.dropExt("foo\\bar\\baz.txt"), "foo\\bar\\baz")
      })

      it("drops the ext for a relative dir path", () => {
        eq(P2.dropExt("foo\\bar\\baz\\"), "foo\\bar\\baz\\")
      })

      it("drops the ext for an absolute file path", () => {
        eq(P2.dropExt("C:\\foo\\bar\\baz.txt"), "C:\\foo\\bar\\baz")
      })

      it("drops the ext for an absolute dir path", () => {
        eq(P2.dropExt("C:\\foo\\bar\\baz\\"), "C:\\foo\\bar\\baz\\")
      })
    })

    describe("padNumeric()", () => {
      it("works", () => {
        eq(P2.padNumeric(4, "x"), "x")
        eq(P2.padNumeric(4, "1"), "0001")
      })
    })

    describe("padName()", () => {
      it("works", () => {
        eq(P2.padName(2, "1.1.foo.js"), "01.01.foo.js")
      })
    })

    describe("padPath()", () => {
      it("works", () => {
        eq(P2.padPath(2, "1.folder\\file.1.md"), "01.folder\\file.01.md")
      })
    })
  })
})
