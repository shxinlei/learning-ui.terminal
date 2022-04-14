import * as React from "react";
import Editor, {EditorProps} from "./Editor";
import styles from "./index.less"

const Terminal = ({ key ,...props }: EditorProps) => {
    return <div className={styles.wrap} key={key}>
        <Editor {...props} />
    </div>
}


export default Terminal;