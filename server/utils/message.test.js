var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        var from = 'TestAdmin';
        var text = 'Hi There!!!';
        var result = generateMessage(from, text);

        expect(result).toInclude({
            from,
            text
        });
        expect(result.createdAt).toBeA('number');
    });

});