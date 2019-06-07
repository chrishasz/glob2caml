
// The module 'assert' provides assertion methods from node

import { GlobToCamlConverter } from "../src/globToCamlConverter";


describe("Where Conversion Tests", () => {

    beforeEach(() => {
    });

    it("Will return an empty Where clause inside of a Query", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter({});

        let result : string = converter.Convert('');

        expect(result).toBe('<View><Query><Where></Where></Query></View>');
    });

    it("Will return an empty Where clause only", () =>{
        let converter : GlobToCamlConverter = new GlobToCamlConverter({
            whereClauseOnly : true
        });

        let result : string = converter.Convert('');

        expect(result).toBe('<where></where>');
    });
});