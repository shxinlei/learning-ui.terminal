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
            prefixCommand={"PS C:\\Users\\10652>"}
            // fontFamily={}
            height={500}
            terminalMessage= {[
                { title: "Windows PowerShell", color: "red" , align: "left"},
                { title: "版权所有（C） Microsoft Corporation。保留所有权利👹👎🌔🌟", align: "left" },
                { title: "安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows", align: "left" }
            ]} //{"123123"}
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
