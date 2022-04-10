import * as React from "react";
import Editor from "./Editor";
import styles from "./index.less"

const Terminal = ({ ...props }) => {


    return <div className={styles.wrap}>
        <Editor {...props} />

    </div>
}


export default Terminal;