
// The module 'assert' provides assertion methods from node
import { expect } from 'chai';
import { GlobToCamlConverter } from "../src/globToCamlConverter";


describe("Negated Tests", () => {

    beforeEach(() => {
    });

    it("Will detect a basic negation", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter({
            column : "Title"
        });

        let result : string = converter.Convert('!foo');

        expect(result).to.equal('<Query><Where><Neq><FieldRef Name="Title"/><Value Type="Text">foo</Value></Neq></Where></Query>');
    });

});

// it('should detect when a pattern is negated:', function () {
//     assert.equal(parse('a.min.js').is.negated, false);
//     assert.equal(parse('!*.min.js').is.negated, true);
//     assert.equal(parse('!foo/{a,b}.min.js').is.negated, true);
//     assert.equal(parse('!foo/(a|b).min.js').is.negated, true);
//     assert.equal(parse('!foo/[a-b].min.js').is.negated, true);
//     assert.equal(parse('foo').is.negated, false);
//   });