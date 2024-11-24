export class FilteSortable {
    constructor( array ) {
        this.array = [...array];
    }
    filter( fieldSelector, pattern ) {
        this.array = this.array.filter( item => fieldSelector( item ).toLowerCase().startsWith( pattern.toLowerCase() ) );
        return this;
    }
    sort( fieldSelector, type, order ) {
        if ( order === '' ) return this;
        if ( order !== 'asc' && order !== 'desc' ) throw Error( `Unknown sorting order: "${order}"` );
        switch ( type ) {
            case 'number':
                this.array.sort( ( a, b ) => ( fieldSelector( a ) - fieldSelector( b ) ) * ( order === 'asc' ? 1 : -1 ) );
                return this;
            case 'string':
                this.array.sort( ( a, b ) => fieldSelector( a ).localeCompare( fieldSelector( b ) ) * ( order === 'asc' ? 1 : -1 ) );
                return this;
            default:
                throw Error( `Unknown data type: "${type}"` );
        }
    }
    selectTopBy( groupBySelector, count ) {
        if ( Number( count ) > 0 ) {
            const result = this.array.reduce( ( acc, curr ) => {
                if ( ( acc.valueCount[groupBySelector( curr )] = ( acc.valueCount[groupBySelector( curr )] || 0 ) + 1 ) < Number( count ) + 1 ) {
                    acc.output.push( curr );
                }
                console.log( 'count+1:', Number( count ) + 1, acc );
                return acc;
            }, { valueCount: {}, output: [] } ).output;
            return result;
        }
        return this.array;
    }
    toArray() {
        console.log( 'Sortable:', this.array );
        return this.array;
    }
}