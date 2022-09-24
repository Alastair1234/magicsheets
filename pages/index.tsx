import type {NextPage} from 'next'
import Head from 'next/head'
import {ChangeEvent, useEffect, useState} from "react";
import Table from "./components/table";

const Home: NextPage = () => {
    const submitRow = async (params: string) => {
        const response = await fetch('/api/sheet');
        const data = await response.json();
        console.log(data);
    }

    const handelFileUploaded = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = async (e) => {
            let data = reader.result?.split("\r\n");
            for (let i in data) {
                data[i] = data[i].split(",");
            }
            setCsvData(data);
        }
        reader.readAsText(file);
    }

    const [csvData, setCsvData] = useState<string[][]>([]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Magic Sheets</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to{' '}
                    <a className="text-blue-600" href="https://nextjs.org">
                        Magic Sheets
                    </a>
                </h1>
                <p className="mt-3 text-2xl">
                    Get started by uploading{' '}
                    <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
                        <button onClick={() => submitRow('upload csv')}>
                            your csv
                        </button>
                    </code>
                </p>
                <input type="file" accept=".csv" onChange={handelFileUploaded}/>
            </main>
            {csvData.length > 0 &&
                <Table people={csvData}/>
            }
            <footer className="flex h-24 w-full items-center justify-center border-t">
                Made with ❤️{' '} <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
                in London
            </code>
            </footer>
        </div>
    )
}

export default Home
