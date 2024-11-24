import React, { Component } from "react";
import styles from './MapErrorBoundary.module.scss';

class MapErrorBoundary extends Component {
    constructor( props ) {
        super( props );
        this.state = { hasError: false };
    }

    static getDerivedStateFromError( _ ) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch( error, errorInfo ) {
        console.error( "Uncaught error:", error, errorInfo );
        this.setState( { hasError: true, error: error.message } );
    }

    render() {
        if ( this.state.hasError ) {
            return (
                <div className={styles.container}>
                    <span className={styles.header}>&lt;ErrorBoundary&gt;</span>
                    <p className={styles.msg}>{this.state.error}</p>
                    <span className={styles.header}>&lt;/ErrorBoundary&gt;</span>
                </div>
            );
        }

        return this.props.children;
    }
}

export default MapErrorBoundary;
