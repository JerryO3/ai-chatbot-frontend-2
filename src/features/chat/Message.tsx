import { useState } from "react"

export default function Message(prop:{response: string, source: Object|null}) {
    return prop.source
        ? 
        <MessageWithSource response={prop.response} source={prop.source}></MessageWithSource>
        : 
        <div>
            {prop.response}
        </div>
}

function MessageWithSource(prop:{response: string, source: Object|null}) {
    const [isHidden, setIsHidden] = useState(true)
    return (
        <div>
            <div>
                {prop.response}
            </div>
            <button onClick={() => setIsHidden(!isHidden)}>
                Source
            </button>
            <div hidden={isHidden}>
                {Object.keys(prop.source!).map(
                    (key, index) => <div key={index}>
                                <div>{key}</div>
                                <div>{prop.source?(prop.source as any)[key]:""}</div>
                            </div>
                )}
            </div>
        </div>
    )
}