import Head from 'next/head'

export default ({ title }) => (
  <Head>
    <title>{title ? title + ' - ZHOU' : 'ZHOU'}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <link rel="icon" href="/static/img/favicon.ico" />
  </Head>
)