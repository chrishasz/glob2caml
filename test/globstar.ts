
// The module 'assert' provides assertion methods from node
import { expect } from 'chai';
import { GlobToCamlConverter } from "../src/globToCamlConverter";


describe("GlobStar Tests", () => {

    beforeEach(() => {
    });

    it("Will detect a basic Globstar", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter();

        let result : string = converter.Convert('**/*');

        expect(result).to.equal('<Query></Query>');
    });

//     assert.equal(parse('**').is.globstar, true);
//     assert.equal(parse('**/*.min.js').is.globstar, true);
//     assert.equal(parse('**/*foo.js').is.globstar, true);
//     assert.equal(parse('*/*').is.globstar, false);
//     assert.equal(parse('*/*/**/a.js').is.globstar, true);

});
