import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { ipcRenderer } from 'electron'

export default function HomePage() {
  const [message, setMessage] = React.useState('No message found')
  const [file, setFile] = React.useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState('');

  React.useEffect(() => {
    window.ipc.on('retrieve', (message: string) => {
      // const base64String = btoa(String.fromCharCode(...new Uint8Array(message)));
      setMessage(message)
    })
    window.ipc.on('message', (message: string) => {
      setMessage(message)
    })
  }, [])

  // const = byteString = message

  useEffect(() => {
    // const binaryString = hexToBinary(message); // Convert hex string to binary
    // const base64String = binaryToBase64(binaryString); // Convert binary to Base64
    setImageSrc(`data:image/jpeg;base64,${message}`);
    // `data:image/jpeg;base64,${message}`
  }, [message]);

  const hexToBinary = (hexString) => {
    const bytes = new Uint8Array(Math.ceil(hexString.length / 2));
    for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
      bytes[j] = parseInt(hexString.substr(i, 2), 16);
    }
    return bytes;
  };
  const binaryToBase64 = (binary) => {
    const blob = new Blob([binary], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  };

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
         
            window.ipc.send('save', file.path)
          }}
        >
          Test IPC
         
        </button>
        <button onClick={()=>window.ipc.send('retrieve', `D://Javascript/test-app/images/test2/1700065754526.jpg`)}>
          test render
        </button>


        <img src={imageSrc} alt="From Server" />;
        {/* <img src={`../../images/test2/1700065830898.jpg`} alt="From Server" />; */}
        <p>{message}</p>
        <p>{imageSrc}</p>


      </div>
    </React.Fragment>
  )
}
