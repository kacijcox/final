import React from 'react';
import hedgeHog from '../assets/hedgehog.webp';
import Navbar from "../components/Navbar.jsx";
import '../styles/About.css';
import Footer from "../components/Footer.jsx";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-page">
            <div className="container about-box">
                <h1 className="header-text">About Hedge Hog</h1>
            </div>

            <div className="hedge">
                <img
                    className="hedge-pic"
                    src={hedgeHog}
                    alt="hedgepic"
                    width={400}
                    height={400}
                />
            </div>

            <div className="container about-box">
                <p className="about">
                    At Hedge Hog, we are dedicated to educating the public and ensuring everyone trades safely and
                    responsibly. We understand how stressful navigating trading can be, especially in digital currencies.
                    That’s why we offer several tiers. Our free tier is accessible to everyone and provides trading tutorials
                    and helpful websites to make your journey easier and safer. Speaking of safety, visit our
                    <a href="/Safety"> safety page</a> to learn more about securing your digital assets. Subscribe to our
                    premium package, and a live agent will be available 24/7 to guide you with all your trading questions and needs.
                </p>
            </div>

            <div className="container disclaimer-box">
                <p className="disclaimer">
                    <strong>Disclaimer:</strong> For educational purposes only. The content provided on this website, including tutorials,
                    guides, code samples, and discussions, is for informational and educational purposes only and does not constitute
                    financial advice, investment recommendations, or trading advice under U.S. Commodity Futures Trading Commission
                    (CFTC) or National Futures Association (NFA) regulations. We are not registered as financial or commodity trading
                    advisors with the NFA, and no content on this site should be interpreted as such. Cryptocurrency and digital asset
                    markets are highly volatile and involve a significant risk of loss. Always conduct your own research (DYOR) and
                    consult with a registered financial advisor before making any investment or trading decisions. By using this site,
                    you acknowledge and agree that:
                    <br/><br/>
                    - You are solely responsible for any actions taken based on information found here.
                    <br/>
                    - The authors and publishers are not liable for any losses or damages arising from your use of the content.
                </p>
            </div>

            <div className="tech-stack">
                <ul>
                    <li><strong>Frontend Technologies</strong>
                        <ul>
                            <li>Core frontend framework <strong>React</strong></li>
                            <li><strong>React Router DOM</strong> - Client-side routing</li>
                            <li><strong>Vite</strong> - Build tool and development server</li>
                            <li><strong>JavaScript</strong> - Programming language</li>
                            <li><strong>CSS3</strong> - Styling with custom CSS files</li>
                            <li><strong>HTML5</strong> - Markup language</li>
                        </ul>
                    </li>

                    <li><strong>Backend Technologies</strong>
                        <ul>
                            <li><strong>Java 21</strong> - Programming language</li>
                            <li><strong>Spring Boot</strong> - Application framework</li>
                            <li><strong>Spring MVC</strong> - Web framework</li>
                            <li><strong>Spring Data JPA</strong> - Data persistence layer</li>
                            <li><strong>Spring Data JDBC</strong> - Database connectivity</li>
                            <li><strong>Spring Security</strong> - Authentication and authorization</li>
                            <li><strong>Spring Boot Mail</strong> - Email functionality</li>
                            <li><strong>Spring Boot Validation</strong> - Input validation</li>
                            <li><strong>Maven</strong> - Build tool and dependency management</li>
                        </ul>
                    </li>

                    <li><strong>Database</strong>
                        <ul>
                            <li><strong>MySQL</strong> - Relational database</li>
                            <li><strong>Hibernate</strong> - ORM framework</li>
                            <li><strong>Jakarta Persistence (JPA)</strong> - Persistence specification</li>
                        </ul>
                    </li>

                    <li><strong>Blockchain Integration</strong>
                        <ul>
                            <li><strong>Solana Web3.js</strong> - Solana blockchain interaction</li>
                            <li><strong>Solana Wallet Adapter React</strong> - Wallet connection</li>
                            <li><strong>Solana Wallet Adapter React UI</strong> - Wallet UI components</li>
                            <li><strong>Solana Wallet Adapter Wallets</strong> - Wallet implementations</li>
                            <li><strong>Buffer</strong> - Binary data handling for blockchain</li>
                        </ul>
                    </li>

                    <li><strong>External APIs & Services</strong>
                        <ul>
                            <li><strong>CoinGecko API</strong> - Cryptocurrency price data</li>
                            <li><strong>CoinGecko Widgets</strong> - Price chart visualization</li>
                            <li><strong>Gmail SMTP</strong> - Email service integration</li>
                        </ul>
                    </li>

                    <li><strong>Azure Integration</strong>
                        <ul>
                            <li><strong>Azure SQL Database</strong> - Cloud database migration</li>
                            <li><strong>Azure App Service</strong> - Application hosting</li>
                            <li><strong>Azure Key Vault</strong>  - Secure configuration management</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
            <Footer />
        </>
    );
};

export default About;
