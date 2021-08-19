'use strict';

import * as parseGlob from 'parse-glob';
import { IConversionOptions } from ".";

/**
 * 
 */
export class GlobToCamlConverter {

    public conversionOptions : IConversionOptions;

    constructor(settings? : IConversionOptions){
        this.conversionOptions = settings || {};
    }

    /**
     * 
     * @param path 
     * @returns 
     */
    public Convert(globString : string) : string {
        
        let camlQuery : string = '';
        
        if(globString){

            const glob = parseGlob(globString);

            //Limitation - can only support Neq for specific filenames.
            if(glob.is.negated){
                camlQuery = this.queryNotEqual(() => this.createFieldRef(this.conversionOptions.column), glob.path.basename);

                camlQuery = this.where(camlQuery);
            }
            else if(!glob.is.negated){
                if(glob.path.filename == '*'){
                    // looking for all files: *, *.*
                    if(glob.path.extname == '*' || glob.path.extname == ''){
                        camlQuery = '';
                    }
                    //trim out *, and create like: *.css => .css
                    else{
                        camlQuery = this.queryLike(() => this.createFieldRef(this.conversionOptions.column), glob.path.basename.replace(/\*/gi,''));
                        camlQuery = this.where(camlQuery);
                    }

                }
                else{
                    // looking for single basename: fileName.*
                    if(glob.path.extname == '*'){
                        camlQuery = this.queryLike(() => this.createFieldRef(this.conversionOptions.column), glob.path.basename);
                    }
                    // looking for a single file: filename.ext
                    else{
                        camlQuery = this.queryEqual(() => this.createFieldRef(this.conversionOptions.column), glob.path.basename);
                    }

                    camlQuery = this.where(camlQuery);
                }
            }

            //check for folder scope
            // if(!glob.is.globstar && camlQuery != ''){
            //     camlQuery = this.combineAnd(this.queryEqual(this.createFieldRef, glob.base), camlQuery );
            // }
            // else if(glob.is.globstar && camlQuery != ''){
            //     camlQuery = this.combineAnd(this.queryLike(this.createFieldRef, glob.base), camlQuery );
            // }
            if(!this.conversionOptions.whereClauseOnly){
                camlQuery = this.query(camlQuery);
            }
        }

        return camlQuery;
    }

    // private combineAnd(firstQuery:string, secondQuery:string){
    //     return `<And>${firstQuery}${secondQuery}</And>`;
    // }

    private queryEqual(operation : Function, value:string){
        return `<Eq>${operation()}${this.getValue(value)}</Eq>`;
    }

    private queryLike(operation : Function, value:string){
        return `<Contains>${operation}${this.getValue(value)}</Contains>`;
    }

    private queryNotEqual(operation : Function, value:string){
        return `<Neq>${operation()}${this.getValue(value)}</Neq>`;
    }

    private query(value : string){
        return `<Query>${value}</Query>`;
    }

    private where(value : string){
        return `<Where>${value}</Where>`;
    }

    public createFieldRef(column : string){
        //column = column || this.conversionOptions.column;

        return `<FieldRef Name="${column}"/>`;
    }

    private getValue(value:string){
        return `<Value Type="Text">${value}</Value>`;
    }
}