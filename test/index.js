let {leftDir, rightDir, addLeftDir, addRightDir, dropLeftDir,
    dropRightDir, withLeftDir, withRightDir, withDir, withBase, withName,
    withExt, dropBase, dropExt, pad, padNumeric} = require('../index.js');
var assert = require('assert');
var expect = require('chai').expect;

describe('index.js', () => {
    describe('tested-function-leftDir', () => {
        it('should return left dir of path', () => {
            assert.equal('home', leftDir('home/user/dir/file.txt'));
        });
    });

    describe('tested-function-rightDir', () => {
        it('should return right path of dir', () => {
            assert.equal('dir', rightDir('home/user/dir/file.txt'));
        });
    });

    describe('tested-function-addRightDir', () => {
        it('should add right dir to path', () => {
            assert.equal('home/user/dir/test/file.txt', addRightDir('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-addLeftDir', () => {
        it('should add left dir to path', () => {
            assert.equal('test/home/user/dir/file.txt', addLeftDir('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-dropLeftDir', () => {
        it('should remove left dir from path', () => {
            assert.equal('user/dir/file.txt', dropLeftDir('home/user/dir/file.txt'));
        });
    });

    describe('tested-function-dropRightDir', () => {
        it('should remove right dir from path', () => {
            assert.equal('home/user/file.txt', dropRightDir('home/user/dir/file.txt'));
        });
    });

    describe('tested-function-withLeftDir', () => {
        it('should change left dir', () => {
            assert.equal('test/user/dir/file.txt', withLeftDir('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-withRightDir', () => {
        it('should change right dir', () => {
            assert.equal('home/user/test/file.txt', withRightDir('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-withDir', () => {
        it('should return path, contains only preassigned dir and file', () => {
            assert.equal('test/file.txt', withDir('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-withBase', () => {
        it('should return path, with file name and without file ext', () => {
            assert.equal('home/user/dir/test', withBase('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-withName', () => {
        it('should change name of file', () => {
            assert.equal('home/user/dir/test.txt', withName('test', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-withExt', () => {
        it('should change ext of file', () => {
            assert.equal('home/user/dir/file.js', withExt('.js', 'home/user/dir/file.txt'));
        });
    });

    describe('tested-function-dropBase', () => {
        it('should return path without file', () => {
            assert.equal('home/user/dir/', dropBase('home/user/dir/file.txt'));
        });
    });

    describe('tested-function-dropExt', () => {
        it('should drop file ext', () => {
            assert.equal('home/user/dir/file', dropExt('home/user/dir/file.txt'));
        });
    });

    describe('tested-function-pad', () => {
        it(' pad(z,w,s) should return (z.repeat(w) + s).slice(s.length)', () => {
            assert.equal('babc', pad('ab', 2, 'c'));
        });
    });

    describe('tested-function-padNumeric', () => {
        it('padNumeric(w, s) should return w repeat s times + s if typeOf s == number', () => {
            assert.equal('0002', padNumeric(3, 2));
        });

        it('padNumeric(w, s) should return s if typeOf s !== number', () => {
            assert.equal('abc', padNumeric(3, 'abc'));
        });
    });
});