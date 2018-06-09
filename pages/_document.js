import Document, { Head, Main, NextScript } from 'next/document'
import { Grid } from 'react-bootstrap'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Grid>
            <Main />
          </Grid>
          <NextScript />
        </body>
      </html>
    )
  }
}
