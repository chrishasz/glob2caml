'use strict';

import { IConversionOptions } from ".";

export class GlobToCamlConverter {

    public conversionOptions : IConversionOptions;

    constructor(settings : IConversionOptions){
        this.conversionOptions = settings;
    }

    public Convert(glob : any) : string {
        
        let camlQuery : string = '';

        //Full Query or Where only?
        if( !this.conversionOptions.whereClauseOnly){

        }

        //Limitation - can only support Neq for specific filenames.
        if(glob.is.negated){
            camlQuery = this.queryNotEqual(() => this.getFieldRef, glob.path.basename);
        }
        else if(!glob.is.negated){
            if(glob.path.filename == '*'){
                // looking for all files: *, *.*
                if(glob.path.extname == '*' || glob.path.extname == ''){
                    camlQuery = '';
                }
                //trim out *, and create like: *.css => .css
                else{
                    camlQuery = this.queryLike(this.getFieldRef, glob.path.basename.replace(/\*/gi,''));
                }
            }
            else{
                // looking for single basename: fileName.*
                if(glob.path.extname == '*'){
                    camlQuery = this.queryLike(this.getFieldRef, glob.path.basename);
                }
                // looking for a single file: filename.ext
                else{
                    camlQuery = this.queryEqual(this.getFieldRef, glob.path.basename);
                }
            }
        }

        //check for folder scope
        if(!glob.is.globstar && camlQuery != ''){
            camlQuery = this.combineAnd(this.queryEqual(this.getFileDirRef, /*spSitePath +*/ glob.base), camlQuery );
        }
        else if(glob.is.globstar && camlQuery != ''){
            camlQuery = this.combineAnd(this.queryLike(this.getFileDirRef, /*spSitePath +*/ glob.base), camlQuery );
        }
        
        return this.where(camlQuery);
    }

    private combineAnd(firstQuery:string, secondQuery:string){
        return `<And>${firstQuery}${secondQuery}</And>`;
    }

    private queryEqual(operation : Function, value:string){
        return `<Eq>${operation()}${this.getValue(value)}</Eq>`;
    }

    private queryLike(operation : Function, value:string){
        return `<Contains>${operation()}${this.getValue(value)}</Contains>`;
    }

    private queryNotEqual(operation : Function, value:string){
        return `<Neq>${operation()}${this.getValue(value)}</Neq>`;
    }

    private query(operation : Function){
        return `<query>${operation()}</query>`;
    }

    private where(value : string){
        return `<where>${value}</where>`;
    }

    private view(operation : Function){
        return `<view>${operation()}</view>`;
    }

    private getFileDirRef(){
        return '<FieldRef Name="FileDirRef"/>';
    }

    private getFieldRef(){
        return '<FieldRef Name="FileLeafRef"/>';
    }

    private getValue(value:string){
        return `<Value Type="Text">${value}</Value>`;
    }
}