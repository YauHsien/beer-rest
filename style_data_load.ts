import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';

export type TypeStyle = {
    style: string;
    id: number;
};

export const style_data = (() => {
    const csv_path = path.resolve(__dirname, '../styleData.csv');
    const headers = ['style', 'id'];
    const content = fs.readFileSync(csv_path, { encoding: 'utf-8' });

    var records = parse(content, {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        cast: (value, context) => {
            if (context.column === 'StyleID')
                return parseInt(value, 10);
            return value;
        },
    });

    for (let i=0; i < records.length; i++) {
        let record: TypeStyle = records[i]; // type-check all records
    }

    return records
})();
