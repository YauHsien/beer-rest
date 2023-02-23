import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';

export type TypeRecipe = {
    deleted?: boolean;
    BeerID: number;
    Name: string;
    URL: string;
    Style: string;
    StyleID: number;
    'Size(L)': number;
    OG: number;
    FG: number;
    ABV: number;
    IBU: number;
    Color: number;
    BoilSize: number;
    BoilTime: number;
    BoilGravity: number | 'N/A';
    Efficiency: number;
    MashThickness: number | 'N/A';
    SugarScale: 'Plato' | 'Specific Gravity';
    BrewMethod: 'All Grain' | 'BIAB' | 'extract' | 'Partial Mash';
    PitchRate: number | 'N/A';
    PrimaryTemp: number | 'N/A';
    PrimingMethod: string | 'N/A';
    PrimingAmount: string | 'N/A';
};

export const recipe_data = (() => {
    const csv_path = path.resolve(__dirname, '../recipeData.csv');
    const headers = ['BeerID','Name','URL','Style','StyleID','Size(L)','OG','FG','ABV','IBU','Color','BoilSize','BoilTime','BoilGravity','Efficiency','MashThickness','SugarScale','BrewMethod','PitchRate','PrimaryTemp','PrimingMethod','PrimingAmount'];
    const content = fs.readFileSync(csv_path, { encoding: 'utf-8' });

    var records = parse(content, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        cast: (value, context) => {
            if (value === 'N/A')
                return value;
            if (context.column === 'BeerID' || context.column === 'StyleID')
                return parseInt(value, 10);
            if (typeof context.column === 'string' &&
                ['Size(L)','OG','FG','ABV','IBU','Color','BoilSize','BoilTime','BoilGravity','Efficiency','MashThickness','PitchRate','PrimaryTemp']
                    .indexOf(context.column) !== -1)
                return parseFloat(value);
            return value;
        },
    });

    for (let i=0; i < records.length; i++) {
        let record: TypeRecipe = records[i]; // type-check all records
    }

    return records
})();
