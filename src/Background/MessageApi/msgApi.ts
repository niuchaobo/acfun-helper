const echo = (msg: { data: any }) => {
    return Promise.resolve(msg)
}

export const MsgUsers: Record<string, (...args: any) => Promise<any> | undefined | void> = {
    "/bg/echo": echo
}