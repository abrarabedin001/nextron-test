import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [message, setMessage] = React.useState('No message found')
  const [file, setFile] = React.useState<File | null>(null)

  React.useEffect(() => {
    window.ipc.on('message', (message: string) => {
      setMessage(message)
    })
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (basic-lang-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width="256px"
          height="256px"
        />
      </div>
      <input type="file" onChange={e=>setFile(e.target.files[0])} />
      <div>
        <button
          onClick={() => {
            console.log(file.path)
            window.ipc.send('message', file.path)
          }}
        >
          Test IPC
        </button>
        <p>{message}</p>
      </div>
    </React.Fragment>
  )
}
