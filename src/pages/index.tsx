import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import papa from 'papaparse';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('../components/Table/Table'), { ssr: false });

const Home: NextPage = () => {
  const [file, setFile] = useState<any>();
  const [fileData, setFileData] = useState<any[]>([])

  useEffect(() => {
    if (file) {
      papa.parse(file, {
        complete: (results) => {
          setFileData(results.data);
        }
      })
    }
  }, [file])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Magic Sheets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Magic Sheets
          </a>
        </h1>
        <div className="mt-3 text-2xl flex items-center gap-3 mb-10">
          Get started by uploading{' '}
          <FileUpload setFile={setFile} />
        </div>
        <Table data={fileData} />
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        Made with ❤️{' '} <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
          in London
        </code>
      </footer>
    </div>
  )
}

export default Home
