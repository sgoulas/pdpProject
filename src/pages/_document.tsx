import React, { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render(): ReactElement {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="icon"
                        type="image/x-icon"
                        href="/static/favicon.ico"
                    ></link>
                    <link href="/fonts.css" rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
