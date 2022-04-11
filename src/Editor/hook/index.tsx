

import React, {useEffect, useState} from "react";
import {EnumCommand} from "./command";




const useCommand = (commandMessage) => {

    const [ command , setCommand ] = useState({});

    useEffect(() => {
        setCommand({
            ...EnumCommand,
            ...commandMessage
        });
    }, [commandMessage]);


    return [ command ]
}

export default useCommand;