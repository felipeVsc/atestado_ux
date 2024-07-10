import { CSSProperties } from "react";


export const PreviewStyles = {
    main: {
        backgroundColor: '#ECE6F0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
    } as CSSProperties,

    sectionBox: {
        width: '100%',
    } as CSSProperties,

    sectionTitle: {
        width: '100%',
        textAlign: 'center',
        background: 'black',
        color: 'white',
        fontSize: '18px',
        height: '60px',
        lineHeight: '60px',
    } as CSSProperties,

    rowWithSpacing: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '1rem',
    } as CSSProperties,

    column: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
    } as CSSProperties,

};