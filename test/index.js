let P = require('../index')
let eq = require('assert').deepStrictEqual


describe('index.js', () => {
  describe('tested-function-leftDir', () => {
    it('should return left dir of path', () => {
        eq('home', P.leftDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-rightDir', () => {
    it('should return right path of dir', () => {
        eq('dir', P.rightDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-addRightDir', () => {
    it('should add right dir to path', () => {
        eq('home/user/dir/test/file.txt', P.addRightDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-addLeftDir', () => {
    it('should add left dir to path', () => {
        eq('test/home/user/dir/file.txt', P.addLeftDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-dropLeftDir', () => {
    it('should remove left dir from path', () => {
        eq('user/dir/file.txt', P.dropLeftDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-dropRightDir', () => {
    it('should remove right dir from path', () => {
        eq('home/user/file.txt', P.dropRightDir('home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-withLeftDir', () => {
    it('should change left dir', () => {
        eq('test/user/dir/file.txt', P.withLeftDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-withRightDir', () => {
    it('should change right dir', () => {
        eq('home/user/test/file.txt', P.withRightDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-withDir', () => {
    it('should return path, contains only preassigned dir and file', () => {
        eq('test/file.txt', P.withDir('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-withBase', () => {
    it('should return path, with file name and without file ext', () => {
        eq('home/user/dir/test', P.withBase('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-withName', () => {
    it('should change name of file', () => {
        eq('home/user/dir/test.txt', P.withName('test', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-withExt', () => {
    it('should change ext of file', () => {
        eq('home/user/dir/file.js', P.withExt('.js', 'home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-dropBase', () => {
    it('should return path without file', () => {
        eq('home/user/dir/', P.dropBase('home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-dropExt', () => {
    it('should drop file ext', () => {
        eq('home/user/dir/file', P.dropExt('home/user/dir/file.txt'))
      }
    )
  })

  describe('tested-function-pad', () => {
    it('should work', () => {
        eq('babc', P.pad('ab', 2, 'c'))
      }
    )
  })

  describe('tested-function-padNumeric', () => {
    it('padNumeric(w, s) should return w repeat s times + s if typeOf s == number', () => {
        eq('0002', P.padNumeric(3, 2))
      }
    )

    it('padNumeric(w, s) should return s if typeOf s !== number', () => {
      eq('abc', P.padNumeric(3, 'abc'))
    })
  })

  describe('tested-function-padName', () => {
    it('should work', () => {
        eq('00.a.01', P.padName(2, "0.a.1"))
      }
    )
  })

  describe('tested-function-padPath', () => {
    it('should work', () => {
        eq('000.a.001', P.padPath(3, "0.a.1"))
      }
    )
  })
})
