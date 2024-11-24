import React from 'react';

const TestErr = () => {
    const throwErr = () => { throw Error( 'throwErr: ERROR' ); };
    const getVal = () => throwErr();
    console.log( 'TestErr component rendering' );

    return (
        <div>
            {getVal()}
        </div>
    );
};

export default TestErr;
