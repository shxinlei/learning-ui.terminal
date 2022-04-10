import React, {useRef} from 'react';
import Terminal from "@learning-ui/terminal";


const  App = () => {

    const terminalRef = useRef(null);
    return (
    <div className="App" ref={terminalRef}>
        <Terminal
            element={terminalRef.current}
        />
    </div>
  );
}

export default App;
