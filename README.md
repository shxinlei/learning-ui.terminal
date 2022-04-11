没有找到符合要求的 terminal 插件所以只能自己写一个


在设计的时候想到的了本地直接使用, 但是命令这些东西是需要配合后端进行数据的重建, 返回数据
然后展示, 比如 ls 命令,在用户输入后就需要进行请求, 然后根据请求展示给用户不用的数据, 这时会遇到问题，
就是在请求的时候，如何进行展示，数据具有延后性，所有暂时只能在请求过程中进行输入的禁用, 这时有一个卡顿的情况,
这边暂时没办法解决, 如果后面有需要优化的时候, 再想办法, 建议增加自行增加一个message提示 当前正在获取命令数据,
让用户不至于感觉你这个页面是在卡死的状态.

使用方法
1. 下面是示例
```javascript
<Terminal
    command={commands} // 命令类型
    prefixCommand={"~ >>>"}  // 前缀
    // fontFamily={} // 字体
    height={500} // 高度 默认300
    terminalMessage={[{title: "错误", color: "red", align: "center"}, {
        title: "Welcome to @learning-ui/terminal",
        align: "center"
    }]} //{"123123"} // 顶部的 terminal 的 信息
/>
```
> command 的使用示例 以及定义的 ts 类型

```ts
export type contentProps = string | {title: "string" , color?: string}[];
export type historyProps = { prefix: string , content: string , message: contentProps }
export type callbackProps = (
    { setHistory , setContent , item , history } : { setHistory: ({...props}) => void , setContent: ({...props}) => void , item: { content:contentProps } , history: historyProps }
) => void;
export type PromiseCallback = {content: contentProps , color?: string , callback?:({...props}:callbackProps) => void}

const commands = {
    cd: (after: string, content: string) => {
        return new Promise((res, rej) => {
            if (cdCommand[after.trim() || "defined"]) {
                res(cdCommand[after.trim() || "defined"])
            }
            setTimeout(() => {
                res({
                    content: "lalalallalalalalal",
                    color: "red"
                }) as PromiseCallback
            }, 500)
        });
    }
};
```

|       属性        |                             类型                              |       说明       |
|:---------------:|:-----------------------------------------------------------:|:--------------:|
|     height      |                           number                            |  只能是数字 不支持字符串  |
| terminalMessage |          {title: any , color: string}[] or string           |   支持数组或者字符串    |
|  prefixCommand  |                           string                            |      命令前缀      |
|     command     | (after:string, cmdContent: string) => Promise<contentProps> | 只支持异步,因为需要请求使用 |