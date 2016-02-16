require('should');
var nodecmd = require('../index');

var a = 10;

describe('nodecmd', function() {
    describe('#testa', function() {
        it('should return 1', function() {
            nodecmd.testa(10).should.equal(1)
        })
    })
})