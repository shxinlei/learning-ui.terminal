import React, {useRef} from 'react';
import Terminal from "@learning-ui/terminal";
import { Input } from "antd"
import { TerminalContextProvider , ReactTerminal } from "react-terminal";
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

               console.log(cdCommand[after.trim() || "defined"]);
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
            terminalMessage= {[ { title: "错误", color: "red" , align: "center"}, { title: "Welcome to @learning-ui/terminal", align: "center" } ]} //{"123123"}
        />
        <Input />

        <select onChange={() => {console.log(111)}}>
            <option value={'123123'}>123</option>
            <option value={'222'}>3333</option>
        </select>









        {/*<TerminalContextProvider >*/}
        {/*    <ReactTerminal*/}
        {/*        commands={commands}*/}
        {/*        themes={{*/}
        {/*            "my-custom-theme": {*/}
        {/*                themeBGColor: "#272B36",*/}
        {/*                themeToolbarColor: "#DBDBDB",*/}
        {/*                themeColor: "#FFFEFC",*/}
        {/*                themePromptColor: "#a917a8"*/}
        {/*            }*/}
        {/*        }}*/}
        {/*        height={100}*/}
        {/*        theme={"my-custom-theme"}*/}
        {/*    />*/}
        {/*</TerminalContextProvider>*/}
    </div>
  );
}

export default App;
