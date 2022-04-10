import React, {useRef} from 'react';
import Terminal from "@learning-ui/terminal";
import { Input } from "antd"

const  App = () => {

    const terminalRef = useRef(null);
    return (
    <div className="App" ref={terminalRef}>
        <Terminal
            element={terminalRef.current}
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
