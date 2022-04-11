import * as React from "react";
import Editor, {EditorProps} from "./Editor";
import styles from "./index.less"

const Terminal = ({ ...props }: EditorProps) => {
    return <div className={styles.wrap}>
        <Editor {...props} />
    </div>
}


export default Terminal;