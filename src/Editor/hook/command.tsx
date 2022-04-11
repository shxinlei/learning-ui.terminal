import React from "react";

export const EnumCommand = {
    clear: (after) => {
        let cmd = {
            "--help": {
                content: "清空终端历史记录, 没有参数",
                color: "yellow"
            },
            defined: {
                content: `command "clear ${after.trim()}" error , can try "clear" `,
                color: "red",
            }
        }
        return new Promise((res) => {
            if (!after.trim()) {
                res({
                    content: "clear terminal",
                    color: "yellow",
                    callback: ({...props}) => {
                        const {setContent, setHistory, setCmdPosition} = props;
                        setContent("");
                        setHistory([]);
                    },
                })
            } else {
                res(cmd[after.trim()] || cmd['defined'])
            }
        })
    },


}