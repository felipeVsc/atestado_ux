import { CSSProperties } from "react";


export var Styles = {
    textOutputTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        height: '18px',
    } as CSSProperties,

    textOutputIndexer: {
        border: 'black solid 1px',
        padding: '2px',
        width: '12px',
        height: '12px',
        lineHeight: '12px',
        fontSize: '8px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'black',
    } as CSSProperties,

    textOutputTitle: {
        marginLeft: '5px',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '12px',
    } as CSSProperties,

    textOutputContentBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        border: 'black solid 1px',
        borderRight: '0px',
        borderTop: '0px',
        padding: '5px 10px 5px 10px',
        height: '25px',
        minWidth: '80px',
        paddingLeft: '10px',
        boxSizing: 'content-box',
    } as CSSProperties,

    textOutputContentBoxLast: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        border: 'black solid 1px',
        borderTop: '0px',
        padding: '5px 10px 5px 10px',
        height: '25px',
        minWidth: '80px',
        boxSizing: 'content-box',
    } as CSSProperties,

    textOutputContent: {
        lineHeight: '100%',
        textAlign: 'center',
    } as CSSProperties,


};