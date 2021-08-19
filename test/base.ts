
// The module 'assert' provides assertion methods from node
import { expect } from 'chai';
import { GlobToCamlConverter } from "../src/globToCamlConverter";


describe("Base Tests", () => {

    beforeEach(() => {
    });

    it("Will return an empty query for an empty string", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter();

        let result : string = converter.Convert('');

        expect(result).to.equal('');
    });

    it("Will return an empty query for a null string", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter();

        let result : string = converter.Convert(null);

        expect(result).to.equal('');
    });

    it("Will return a Where clause without a Query", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter({
            column : 'Title',
            whereClauseOnly : true
        });

        let result : string = converter.Convert('foo');

        expect(result).to.equal('<Where><Eq><FieldRef Name="Title"/><Value Type="Text">foo</Value></Eq></Where>');
    });

});