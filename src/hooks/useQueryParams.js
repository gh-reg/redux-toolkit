import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = {};

    for ( let name of searchParams.keys() ) {
        params[name] = searchParams.get( name );
    }

    return params;
}