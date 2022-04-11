import React, {useRef} from 'react';
import Terminal from "@learning-ui/terminal";
import { Input } from "antd"
const  App = () => {

    const cdCommand:{ [key: string]: any } = {
        defined: {
            content: [
                {title: "command error" , color: "red" },
                { title: "please try one try cd --help", color: "green" }
            ],
            color: "red"
        },
        "--help": {
            content: "error",
            color: "yellow"
        },
    }


    const commands = {
        cd: (after: string, content: string) => {
           return new Promise((res, rej) => {
               if(cdCommand[after.trim() || "defined"]) {
                   res(cdCommand[after.trim() || "defined"])
               }
              setTimeout(() => {
                  res({
                      content: "lalalallalalalalal"
                  })
              }, 500)
           });
        }
    };
    const terminalRef = useRef(null);
    return (
    <div className="App" ref={terminalRef}>
        <Terminal
            command={commands}
            prefixCommand={"~ >>>"}
            // fontFamily={}
            height={500}
            terminalMessage= {[ { title: "错误", color: "red" , align: "center"}, { title: "Welcome to @learning-ui/terminal", align: "center" } ]} //{"123123"}
        />
        <Input />

        <select onChange={() => {console.log(111)}}>
            <option value={'123123'}>123</option>
            <option value={'222'}>3333</option>
        </select>
    </div>
  );
}

export default App;
