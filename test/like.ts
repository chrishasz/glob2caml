
// The module 'assert' provides assertion methods from node
import { expect } from 'chai';
import { GlobToCamlConverter } from "../src/globToCamlConverter";


describe("Like Tests", () => {

    beforeEach(() => {
    });

    it("Will detect a basic * pattern", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter({
            column : "Title"
        });

        let result : string = converter.Convert('*.tst');

        expect(result).to.equal('<Query><Where><Like><FieldRef Name="Title"/><Value Type="Text">.tst</Value></Like></Where></Query>');
    });
});