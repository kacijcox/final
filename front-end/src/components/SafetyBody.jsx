import React from "react";
import "../styles/safety.css";

const SafetyBody = () => {
    return (
        <>
                <div className="container learn-box">
                    <h1 className="header-text">Safety Tips</h1>
                </div>

                <div className="container pwned-box">
                    <ul className="pwned-tips">
                        <li className="pwned-list">
                            Never visit links you are unfamiliar with while your wallet is connected to your browser.
                        </li>
                        <li className="pwned-list">
                            Never connect your wallet to any website for any reason without DYOR.
                        </li>
                        <li className="pwned-list">
                            If you do connect your wallet to a website, always remove the connection afterwards. This will mitigate potential future injection attacks.
                        </li>
                        <li className="pwned-list">
                            Never give your seed phrase to anyone online. This includes support.
                        </li>
                        <li className="pwned-list">
                            If support anywhere ever asks for your secret phrase or seed phrase, they are not support and are a bad actor.
                        </li>
                        <li className="pwned-list">
                            Before swapping any tokens, make sure the contract is not malicious. Visit{" "}
                            <a href="https://rugcheck.xyz/" target="_blank" rel="noopener noreferrer">
                                Rugcheck
                            </a>{" "}
                            and paste the contract address to scan before you buy.
                        </li>
                        <li className="pwned-list">
                            Always double-check the address you are sending funds to, as they can NEVER be recovered if sent to the wrong address.
                        </li>
                    </ul>
                </div>
        </>
    );
};

export default SafetyBody;
