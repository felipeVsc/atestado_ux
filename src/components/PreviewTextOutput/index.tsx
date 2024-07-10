import React from "react";
import { Styles } from "./styles";

export default function PreviewTextOutput(props: any) {

    let style = props.width ? { flexGrow: 1, width: props.width } : { flexGrow: 1, width: "100%" };

    return (
        <div style={style} >
            <div style={Styles.textOutputTitleBox}>
                {props.formIndex &&
                    <div style={Styles.textOutputIndexer}>
                        {props.formIndex}
                    </div>
                }
                <div style={Styles.textOutputTitle}>
                    {props.title}
                </div>
            </div>
            <div style={props.last ? Styles.textOutputContentBoxLast : Styles.textOutputContentBox}>
                <div style={Styles.textOutputContent}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}