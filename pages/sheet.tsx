import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import UploadCsv from '../components/upload'
import TableView from '../components/tableView'

const SheetView: NextPage = () => {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Magic Sheets View</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 className="text-4xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
          Magic Sheets View
          </a>
        </h1>
        <div>
        <button className="group relative rounded-md border border-transparent bg-indigo-600 py-2 px-4 mt-5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
         <Link href="/">Upload new CSV</Link>
        </button>
        </div>
        <TableView />
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
          Made with ❤️{' '} <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
          in London
          </code>
      </footer>
    </div>
  )
}

export default SheetView
