let eq = require("assert").deepStrictEqual
let P = require("../index")

describe("index.js", () => {
  describe("dir()", () => {
    it("gets the dir for a relative file path", () => {
      eq(P.dir("foo/bar/baz.txt"), "foo/bar/")
    })

    it("gets the dir for a relative dir path", () => {
      eq(P.dir("foo/bar/"), "foo/bar/")
    })

    it("gets the dir for an absolute file path", () => {
      eq(P.dir("/foo/bar/baz.txt"), "/foo/bar/")
    })

    it("gets the dir for an absolute dir path", () => {
      eq(P.dir("/foo/bar/"), "/foo/bar/")
    })
  })

  describe("base()", () => {
    it("gets the base for a relative file path", () => {
      eq(P.base("foo/bar/baz.txt"), "baz.txt")
    })

    it("gets the base for a relative dir path", () => {
      eq(P.base("foo/bar/"), "")
    })

    it("gets the base for an absolute file path", () => {
      eq(P.base("/foo/bar/baz.txt"), "baz.txt")
    })

    it("gets the base for an absolute dir path", () => {
      eq(P.base("/foo/bar/"), "")
    })
  })

  describe("leftDir()", () => {
    it("gets the leftmost dir for a relative file path", () => {
      eq(P.leftDir("foo/bar/baz.txt"), "foo")
    })

    it("gets the leftmost dir for a relative dir path", () => {
      eq(P.leftDir("foo/bar/baz/"), "foo")
    })

    it("gets the leftmost dir for an absolute file path", () => {
      eq(P.leftDir("/foo/bar/baz.txt"), "foo")
    })

    it("gets the leftmost dir for an absolute dir path", () => {
      eq(P.leftDir("/foo/bar/baz/"), "foo")
    })
  })

  describe("rightDir()", () => {
    it("gets the righmost dir for a relative file path", () => {
      eq(P.rightDir("foo/bar/baz.txt"), "bar")
    })

    it("gets the righmost dir for a relative dir path", () => {
      eq(P.rightDir("foo/bar/baz/"), "baz")
    })

    it("gets the righmost dir for an absolute file path", () => {
      eq(P.rightDir("/foo/bar/baz.txt"), "bar")
    })

    it("gets the righmost dir for an absolute dir path", () => {
      eq(P.rightDir("/foo/bar/baz/"), "baz")
    })
  })

  describe("addLeftDir()", () => {
    it("adds the leftmost dir for a relative file path", () => {
      eq(P.addLeftDir("bar", "foo/baz.txt"), "bar/foo/baz.txt")
    })

    it("adds the leftmost dir for a relative dir path", () => {
      eq(P.addLeftDir("bar", "foo/baz/"), "bar/foo/baz/")
    })

    it("adds the leftmost dir for an absolute file path", () => {
      eq(P.addLeftDir("bar", "/foo/baz.txt"), "/bar/foo/baz.txt")
    })

    it("adds the leftmost dir for an absolute dir path", () => {
      eq(P.addLeftDir("bar", "/foo/baz/"), "/bar/foo/baz/")
    })
  })

  describe("addRightDir()", () => {
    it("adds the rightmost dir for a relative file path", () => {
      eq(P.addRightDir("bar", "foo/baz.txt"), "foo/bar/baz.txt")
    })

    it("adds the rightmost dir for a relative dir path", () => {
      eq(P.addRightDir("bar", "foo/baz/"), "foo/baz/bar/")
    })

    it("adds the rightmost dir for an absolute file path", () => {
      eq(P.addRightDir("bar", "/foo/baz.txt"), "/foo/bar/baz.txt")
    })

    it("adds the rightmost dir for an absolute dir path", () => {
      eq(P.addRightDir("bar", "/foo/baz/"), "/foo/baz/bar/")
    })
  })

  describe("withLeftDir()", () => {
    it("sets the leftmost dir for a relative file path", () => {
      eq(P.withLeftDir("qux", "foo/bar/baz.txt"), "qux/bar/baz.txt")
    })

    it("sets the leftmost dir for a relative dir path", () => {
      eq(P.withLeftDir("qux", "foo/bar/baz/"), "qux/bar/baz/")
    })

    it("sets the leftmost dir for an absolute file path", () => {
      eq(P.withLeftDir("qux", "/foo/bar/baz.txt"), "/qux/bar/baz.txt")
    })

    it("sets the leftmost dir for an absolute dir path", () => {
      eq(P.withLeftDir("qux", "/foo/bar/baz/"), "/qux/bar/baz/")
    })
  })

  describe("withRightDir()", () => {
    it("sets the rightmost dir for a relative file path", () => {
      eq(P.withRightDir("qux", "foo/bar/baz.txt"), "foo/qux/baz.txt")
    })

    it("sets the rightmost dir for a relative dir path", () => {
      eq(P.withRightDir("qux", "foo/bar/baz/"), "foo/bar/qux/")
    })

    it("sets the rightmost dir for an absolute file path", () => {
      eq(P.withRightDir("qux", "/foo/bar/baz.txt"), "/foo/qux/baz.txt")
    })

    it("sets the rightmost dir for an absolute dir path", () => {
      eq(P.withRightDir("qux", "/foo/bar/baz/"), "/foo/bar/qux/")
    })
  })

  describe("dropLeftDir()", () => {
    it("drops the leftmost dir for a relative file path", () => {
      eq(P.dropLeftDir("foo/bar/baz.txt"), "bar/baz.txt")
    })

    it("drops the leftmost dir for a relative dir path", () => {
      eq(P.dropLeftDir("foo/bar/baz/"), "bar/baz/")
    })

    it("drops the leftmost dir for an absolute file path", () => {
      eq(P.dropLeftDir("/foo/bar/baz.txt"), "/bar/baz.txt")
    })

    it("drops the leftmost dir for an absolute dir path", () => {
      eq(P.dropLeftDir("/foo/bar/baz/"), "/bar/baz/")
    })
  })

  describe("dropRightDir()", () => {
    it("drops the rightmost dir for a relative file path", () => {
      eq(P.dropRightDir("foo/bar/baz.txt"), "foo/baz.txt")
    })

    it("drops the rightmost dir for a relative dir path", () => {
      eq(P.dropRightDir("foo/bar/baz/"), "foo/bar/")
    })

    it("drops the rightmost dir for an absolute file path", () => {
      eq(P.dropRightDir("/foo/bar/baz.txt"), "/foo/baz.txt")
    })

    it("drops the rightmost dir for an absolute dir path", () => {
      eq(P.dropRightDir("/foo/bar/baz/"), "/foo/bar/")
    })
  })

  describe("withDir()", () => {
    it("sets the dir for a relative file path", () => {
      eq(P.withDir("qux", "foo/bar/baz.txt"), "qux/baz.txt")
    })

    it("sets the dir for a relative dir path", () => {
      eq(P.withDir("qux", "foo/bar/baz/"), "qux/")
    })

    it("sets the dir for an absolute file path", () => {
      eq(P.withDir("qux", "/foo/bar/baz.txt"), "/qux/baz.txt")
    })

    it("sets the dir for an absolute dir path", () => {
      eq(P.withDir("qux", "/foo/bar/baz/"), "/qux/")
    })
  })

  describe("withBase()", () => {
    it("sets the base for a relative file path", () => {
      eq(P.withBase("qux.js", "foo/bar/baz.txt"), "foo/bar/qux.js")
    })

    it("sets the base for a relative dir path", () => {
      eq(P.withBase("qux.js", "foo/bar/baz/"), "foo/bar/baz/qux.js")
    })

    it("sets the base for an absolute file path", () => {
      eq(P.withBase("qux.js", "/foo/bar/baz.txt"), "/foo/bar/qux.js")
    })

    it("sets the base for an absolute dir path", () => {
      eq(P.withBase("qux.js", "/foo/bar/baz/"), "/foo/bar/baz/qux.js")
    })
  })

  describe("withName()", () => {
    it("sets the name for a relative file path", () => {
      eq(P.withName("qux", "foo/bar/baz.txt"), "foo/bar/qux.txt")
    })

    it("sets the name for a relative dir path", () => {
      eq(P.withName("qux", "foo/bar/baz/"), "foo/bar/baz/qux")
    })

    it("sets the name for an absolute file path", () => {
      eq(P.withName("qux", "/foo/bar/baz.txt"), "/foo/bar/qux.txt")
    })

    it("sets the name for an absolute dir path", () => {
      eq(P.withName("qux", "/foo/bar/baz/"), "/foo/bar/baz/qux")
    })
  })

  describe("withExt()", () => {
    it("sets the ext for a relative file path", () => {
      eq(P.withExt(".js", "foo/bar/baz.txt"), "foo/bar/baz.js")
    })

    it("sets the ext for a relative dir path", () => {
      eq(P.withExt(".js", "foo/bar/baz/"), "foo/bar/baz/.js")
    })

    it("sets the ext for an absolute file path", () => {
      eq(P.withExt(".js", "/foo/bar/baz.txt"), "/foo/bar/baz.js")
    })

    it("sets the ext for an absolute dir path", () => {
      eq(P.withExt(".js", "/foo/bar/baz/"), "/foo/bar/baz/.js")
    })
  })

  describe("dropBase()", () => {
    it("drops the base for a relative file path", () => {
      eq(P.dropBase("foo/bar/baz.txt"), "foo/bar/")
    })

    it("drops the base for a relative dir path", () => {
      eq(P.dropBase("foo/bar/"), "foo/bar/")
    })

    it("drops the base for an absolute file path", () => {
      eq(P.dropBase("/foo/bar/baz.txt"), "/foo/bar/")
    })

    it("drops the base for an absolute dir path", () => {
      eq(P.dropBase("/foo/bar/"), "/foo/bar/")
    })
  })

  describe("dropExt()", () => {
    it("drops the ext for a relative file path", () => {
      eq(P.dropExt("foo/bar/baz.txt"), "foo/bar/baz")
    })

    it("drops the ext for a relative dir path", () => {
      eq(P.dropExt("foo/bar/baz/"), "foo/bar/baz/")
    })

    it("drops the ext for an absolute file path", () => {
      eq(P.dropExt("/foo/bar/baz.txt"), "/foo/bar/baz")
    })

    it("drops the ext for an absolute dir path", () => {
      eq(P.dropExt("/foo/bar/baz/"), "/foo/bar/baz/")
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

  describe.only("padPath()", () => {
    it("works", () => {
      eq(P.padPath(2, "1.folder/file.1.md"), "01.folder/file.01.md")
    })
  })
})
