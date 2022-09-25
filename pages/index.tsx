import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Papa from "papaparse";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const submitRow = async (params: string) => {
    const response = await fetch("/api/sheet");
    const data = await response.json();
    console.log(data);
  };

  const onSelectFile = async (event: any) => {
    console.log(event.target.files);
    Papa.parse(event.target.files[0], {
      complete: async function (results: any) {
        console.log("finished", results.data);
        const rows = results.data;
        const response = await fetch("/api/sheet", {
          method: "POST",
          body: JSON.stringify({
            rows: rows,
          }),
          headers: {
            contentType: "application/json",
          },
        });
      },
    });

    setTimeout(() => {
      router.push("/sheet");
    }, 5000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Magic Sheets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Magic Sheets
          </a>
        </h1>
        <p className="mt-3 text-2xl">
          Get started by uploading{" "}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            <input type="file" name="sheet" onChange={onSelectFile} />
            {/* <button onClick={() => submitRow("upload csv")}>your csv</button> */}
          </code>
        </p>
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        Made with ❤️{" "}
        <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
          in London
        </code>
      </footer>
    </div>
  );
};

export default Home;
