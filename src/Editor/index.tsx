import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import styles from "./index.less"


const Editor = ({...props}) => {

    const {fontFamily, prefixCommand, os = "windows"} = props;
    const [content, setContent] = useState("");

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDownEvent);
        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    })

    const userInformation = prefixCommand || "C:\\Users\\10652>";
    const customAttr = {
        style: {
            fontFamily,
        }
    }

    const handleKeyDownEvent = (event: any) => {
        event.preventDefault();
        const eventKey = event.key;
        if (eventKey === "Enter") {
            return;
        }

        let message = "";

        if (eventKey === "Backspace") {
            message = content.slice(0, -1);
        } else if (eventKey === "ArrowUp") {
            console.log("上一条命令")
        } else if (eventKey === "ArrowDown") {
            console.log("下一条命令")
        } else {
            message = eventKey && eventKey.length === 1
                ? content + eventKey
                : content;
        }
        setContent(message);
    };

    return (
        <React.Fragment>
            <div
                accessKey={"editor"}
                className={styles.editor}
                {...customAttr}
            >
                <div className={styles.topMessage}>顶部行</div>
                <div className={styles[`${os}-command`]}>
                    <div className={styles.prefix}>{userInformation}</div>
                    <div
                        className={styles.content}
                    >
                        {content}
                    </div>
                    <span className={"editor-command-line"}/>
                </div>
            </div>
            <textarea />
        </React.Fragment>
    )
}

export default Editor;