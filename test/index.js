let P = require('../index')
let eq = require('assert').deepStrictEqual


describe('index.js', () => {
  describe('leftDir()', () => {
    it('should return left dir of path', () => {
        eq('home', P.leftDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('rightDir()', () => {
    it('should return right path of dir', () => {
        eq('dir', P.rightDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('addRightDir()', () => {
    it('should add right dir to path', () => {
        eq('home/user/dir/test/file.txt', P.addRightDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('addLeftDir()', () => {
    it('should add left dir to path', () => {
        eq('test/home/user/dir/file.txt', P.addLeftDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('dropLeftDir()', () => {
    it('should remove left dir from path', () => {
        eq('user/dir/file.txt', P.dropLeftDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('dropRightDir()', () => {
    it('should remove right dir from path', () => {
        eq('home/user/file.txt', P.dropRightDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('withLeftDir()', () => {
    it('should change left dir', () => {
        eq('test/user/dir/file.txt', P.withLeftDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('withRightDir()', () => {
    it('should change right dir', () => {
        eq('home/user/test/file.txt', P.withRightDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('withDir()', () => {
    it('should return path, contains only preassigned dir and file', () => {
        eq('test/file.txt', P.withDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('withBase()', () => {
    it('should return path, with file name and without file ext', () => {
        eq('home/user/dir/test', P.withBase('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('withName()', () => {
    it('should change name of file', () => {
        eq('home/user/dir/test.txt', P.withName('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('withExt()', () => {
    it('should change ext of file', () => {
        eq('home/user/dir/file.js', P.withExt('.js', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('dropBase()', () => {
    it('should return path without file', () => {
        eq('home/user/dir/', P.dropBase('home/user/dir/file.txt'))
      }
    )
  })

  describe('dropExt()', () => {
    it('should drop file ext', () => {
        eq('home/user/dir/file', P.dropExt('home/user/dir/file.txt'))
      }
    )
  })

  describe('pad()', () => {
    it('should work', () => {
        eq('babc', P.pad('ab', 2, 'c'))
      }
    )
  })

  describe('padNumeric()', () => {
    it('should work', () => {
        eq('0002', P.padNumeric(3, 2))
      }
    )

    it('should work', () => {
      eq('abc', P.padNumeric(3, 'abc'))
    })
  })

  describe('padName()', () => {
    it('should work', () => {
        eq('00.a.01', P.padName(2, "0.a.1"))
      }
    )
  })

  describe('padPath()', () => {
    it('should work', () => {
        eq('000.a.001', P.padPath(3, "0.a.1"))
      }
    )
  })
})


