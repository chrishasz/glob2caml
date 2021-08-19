'use strict';

import { GlobToCamlConverter } from "./globToCamlConverter";

/**
* @Method: Converts the provided glob into an equivalent .
* @Param {any}
* @Param {IConversionOptions}
* @Return {string}
*/
export function Convert(glob : any, conversionOptions : IConversionOptions) : string {
    let converter : GlobToCamlConverter = new GlobToCamlConverter(conversionOptions);

    return converter.Convert(glob);
}

export interface IConversionOptions{  
    column? : string;
    whereClauseOnly? : boolean;
    orderBy? : string
}