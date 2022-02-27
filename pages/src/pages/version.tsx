import React from "react";
import Layout from "@theme/Layout";

function Hello() {
    return (
        <Layout title="Hello">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                    fontSize: "20px",
                }}
            >
                <div id="connBtn" style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px",
                    margin: ".4em",
                    padding: "1em",
                    cursor: "pointer",
                    background: "#e1e1e1",
                    color: "#666",
                }} onClick={renderVersion}>检查更新</div>
            </div>
        </Layout>
    );
}

function getConnInstance(): Promise<HelperWebSiteConnector.Exposes> {
    let retryNum = 0;
    return new Promise((resolv, reject) => {
        let _timer = setInterval(() => {
            const conn: HTMLDivElement = document.querySelector(
                "div#AcFunHelperConnector"
            );
            if (conn) {
                resolv(JSON.parse(conn.innerText));
                clearInterval(_timer);
            }
            if (retryNum > 10) {
                reject();
                clearInterval(_timer);
            }
        }, 562);
    });
}

async function getVersion() {
    return (await getConnInstance()).version;
}

async function renderVersion() {
    const v = await getVersion();
    let x = document.querySelector("div#version") as HTMLElement
    x.innerText = v;
    let connBtn:HTMLElement= document.querySelector("div#connBtn");
    connBtn.innerText = "检查完成";
}

export default Hello;
