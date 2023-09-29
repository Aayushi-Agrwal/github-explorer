"use client";
import { useState } from "react";

export default function Home() {
  const [show, onShow] = useState(false);
  return (
    <main className="flex flex-col h-screen items-center justify-between py-24 bg-[#F0F0F0] text-[#2E4374] w-full">
      <div className="bg-[#9EDDFF] w-1/3 flex flex-col items-center justify-between rounded-lg h-1/3 py-8">
        <h1>Search for profile!</h1>
        {/* <form> */}
        <input
          type="text"
          placeholder="Type github username"
          className="border-2 border-[#2E4374] w-5/6 placeholder:px-2"
        ></input>
        <button
          className="border-2 border-[#2E4374] w-1/6 bg-white duration-300 hover:scale-110"
          onClick={() => onShow(true)}
        >
          Search
        </button>
        {/* </form> */}
      </div>

      {show && <div>No Results</div>}
    </main>
  );
}
