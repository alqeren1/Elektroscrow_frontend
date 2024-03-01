import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/elektro_adjusted.png" />

                <script
                    src="https://cdn.usefathom.com/script.js"
                    data-site="VQIEMLYL"
                    defer
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
