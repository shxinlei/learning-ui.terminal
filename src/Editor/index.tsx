import React, {useEffect, useRef, useState} from "react";
import styles from "./index.less"
import {deepClone, inset} from "./constant";
import useCommand from "./hook";

export type contentProps = string | {title: "string" , color?: string}[];
export type historyProps = { prefix: string , content: string , message: contentProps }
export type callbackProps = (
    { setHistory , setContent , item , history } : { setHistory: ({...props}) => void , setContent: ({...props}) => void , item: { content:contentProps } , history: historyProps }
) => void;
export type PromiseCallback = {content: contentProps , color?: string , callback?:({...props}:callbackProps) => {}}


export interface EditorProps {
    fontFamily?: any; // 字体类型
    prefixCommand?: string | any[];
    command?:{[key: string]: (after: string, content: string) => Promise<PromiseCallback | unknown>},
    terminalMessage?: string | { title: string , align?: "left" | "center" | "right", color?: string }[];
    [key: string]: any
}

const Editor = ({...props}: EditorProps) => {

    const {
        fontFamily,
        prefixCommand,
        command,
        terminalMessage = 'Welcome to @learning-ui/terminal'
    } = props;
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const [isShowLine, setIsShowLine] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyPointer, setHistoryPointer] = React.useState(null);
    const [cmd] = useCommand(command);
    const [ readyOnly , setReadyOnly ] = useState(false);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDownEvent);
        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    });

    useEffect(() => {
        document.addEventListener("click", clickNot);
        // if(editorRef.current) {
        //     editorRef.current.addEventListener("scroll" , handleScroll)
        // }
        return () => {
            document.removeEventListener("click", clickNot)
            // if(editorRef.current){
            //     editorRef.current.removeEventListener("scroll" , handleScroll);
            // }
        }
    }, []);

    const clickNot = (e) => {
        if (e.target?.dataset?.terminal) {
            setIsShowLine(true);
        } else {
            setIsShowLine(false);

        }
    }

    const userInformation = prefixCommand || "C:\\Users\\10652>";
    const customAttr = {
        style: {
            fontFamily,
            height: 300,
        }
    }

    // const [ cmdPosition , setCmdPosition ] = useState(undefined)

    const handleClear = (_history , editorRef) => {
        setHistory(_history);
        setContent("");
        setHistoryPointer(_history.length);
        editorRef.current.scrollTop = editorRef.current?.scrollHeight - 300;
        editorRef.current.onkeydown = null;
    }

    const handleKeyDownEvent = (event: any) => {

        if (!isShowLine) return;
        if(readyOnly) return;
        const eventKey = event.key;
        if (eventKey === "Enter") { // 点击确定的时候
            console.log(history);
            let _history = deepClone(history);

            let cmdContent = "";
            let cmdArr = content.split(" ").filter(_ => _);
            let resetCmd = cmdArr.map(item => item.trim());

            // 查找首部命令是否与 定义的命令相等 如果相等 这执行 promise
            for (let cmdKey in cmd) {
                if(resetCmd[0] === cmdKey) {
                    cmdContent = resetCmd.join(" ");
                    setReadyOnly(true);
                    cmd[cmdKey](cmdContent.replace(cmdKey, "").trim(), cmdContent).then(res => {
                        _history.push({
                            prefix: userInformation,
                            content: content,
                            message: {
                                ...res,
                            }
                        });
                        setReadyOnly(false)
                        handleClear(_history , editorRef);
                    });
                }
            }

            // 如果 首部命令不存在 报错
            if(!Object.keys(cmd).includes(resetCmd[0])){
                _history.push({
                    prefix: userInformation,
                    content: content,
                    message: {
                        content: "command is not defined",
                        color: "red"
                    }
                });
                handleClear(_history , editorRef);
            }



            return;
        }

        let message = "";

        if (eventKey === "Backspace") { // 回退键盘
            message = content.slice(0, -1);
        } else if (eventKey === "ArrowUp") { // 上一个命令
            event.preventDefault();
            if (historyPointer === 0) {
                if (history.length === 0) {
                    message = "";
                }else {
                    message = history[0]?.content || "";
                }
            }
            message = history[historyPointer - 1]?.content || "";
            if (historyPointer > 0) {
                setHistoryPointer(historyPointer - 1);
            }
        } else if (eventKey === "ArrowDown") { // 下一个命令
            event.preventDefault();
            if (historyPointer + 1 <= history.length) {
                if (historyPointer === history.length) {
                   message = "";
                }
                setHistoryPointer(historyPointer + 1);
                message = history[historyPointer + 1]?.content || "";
            }
        } else { // 其他键输入
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
                <div data-terminal={inset} className={styles.topMessage}>{
                    typeof terminalMessage === "string" ? terminalMessage :
                        terminalMessage?.map((item, index) => {
                            return <span key={index} style={{ color: item.color , textAlign: item.align || 'left'}}>{item?.title}</span>
                        })
                }</div>
                {
                    history?.map((item, index) => {
                        return <div data-terminal={inset} key={index} className={styles[`command`]}>
                            <div data-terminal={inset}>
                                {item.prefix}
                                <code className={styles.content} data-terminal={inset}>
                                    {item.content}
                                </code>
                                {
                                    item.message && <div data-terminal={inset} style={{ color: item.message?.color || "#FFF" }}>
                                        {
                                            typeof item.message?.content === "string" ? item.message.content :
                                                item.message.content?.map((item, index) => {
                                                    return <span key={index} style={{ color: item.color , paddingLeft: index > 0 ? "16px" : "", ...item.style }}>{item?.title}</span>
                                                })
                                        }
                                        {
                                            item.message?.callback && item.message?.callback({
                                                setHistory,
                                                setContent,
                                                item,
                                                history
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    })
                }
                <div data-terminal={inset} className={styles[`command`]}>
                    <div className={isShowLine ? `editor-command-line` : ""} data-terminal={inset}>
                        {userInformation}
                        <code className={styles.content}>
                            {content}
                        </code>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Editor;