import React, { useEffect, useRef, useState} from "react";
import styles from "./index.less"
import {inset} from "./constant";


const Editor = ({...props}) => {

    const {fontFamily, prefixCommand, os = "windows" , element} = props;
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const [ isShowLine , setIsShowLine ] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDownEvent);
        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    });

    useEffect(() => {
        document.addEventListener("click", clickNot);
        return () => {
            document.removeEventListener("click", clickNot)
        }
    }, [])

    const clickNot = (e) => {
        console.log(e, 'e')

        if(e.target?.dataset?.terminal){
            setIsShowLine(true);
        }else {
            setIsShowLine(false);

        }
    }

    const userInformation = prefixCommand || "C:\\Users\\10652>";
    const customAttr = {
        style: {
            fontFamily,
        }
    }

    const handleKeyDownEvent = (event: any) => {
        // event.preventDefault();

        // console.log(event.key)
        if(!isShowLine) return;
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
                data-terminal={inset}
                className={styles.editor}
                ref={editorRef}
                {...customAttr}
            >
                <div data-terminal={inset} className={styles.topMessage}>顶部行</div>
                <div data-terminal={inset} className={styles[`${os}-command`]}>
                    <div data-terminal={inset} className={styles.prefix}>{userInformation}</div>
                    <div
                        className={styles.content}
                        data-terminal={inset}
                    >
                        {content}
                        {isShowLine ? <span data-terminal={inset} className={"editor-command-line"}/> : ""}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Editor;