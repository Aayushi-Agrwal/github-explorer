"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function requestUserRepos(username: string) {
  // create a variable to hold the `Promise` returned from `fetch`
  return Promise.resolve(
    fetch(`https://api.github.com/users/${username}/repos`)
  );
}

function requestUserFollowers(username: string) {
  // create a variable to hold the `Promise` returned from `fetch`
  return Promise.resolve(
    fetch(`https://api.github.com/users/${username}/followers`)
  );
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]); // Specify Repository[] type
  const [followers, setFollowers] = useState<Repository[]>([]); // Specify Repository[] type
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    requestUserRepos(username)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("User not found");
      })
      .then((data: Repository[]) => {
        setRepos(data);
        setError(null);
      })
      .catch((error) => {
        setRepos([]);
        setError(error.message);
      });

    requestUserFollowers(username)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("User not found");
      })
      .then((data: Repository[]) => {
        setFollowers(data);
        setError(null);
      })
      .catch((error) => {
        setFollowers([]);
        setError(error.message);
      });
  };

  return (
    <main className="flex flex-col h-screen items-center justify-between bg-white w-full">
      <Image
        src="/bg.svg"
        alt=""
        width={700}
        height={700}
        className="opacity-50 fixed z-10"
      />
      <div className="absolute z-20 flex flex-col items-center justify-between h-full w-full">
        <div className="w-1/2 flex flex-col items-center justify-between rounded-lg h-1/3 mt-32 z-20">
          <h1 className="text-lg font-semibold">
            Simplifying github account searches
          </h1>
          <p className="text-sm text-center w-5/6">
            Easier to discover profiles, repositories swiftly. Navigate the
            GitHub landscape effortlessly with our intuitive and efficient
            search tool.
            {/* for GitHub Profile! bg-[#9EDDFF] text-[#2E4374] */}
          </p>
          <div className="w-full shadow-xl flex items-center justify-center gap-4 bg-white rounded-sm h-24">
            <input
              type="text"
              placeholder="GitHub username"
              className="border border-slate-100 rounded-md shadow-md w-2/3 py-2 h-12 placeholder:px-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button
              className="bg-[#9EDDFF] w-1/6 h-12 duration-300 hover:scale-110"
              onClick={handleSearch}
              type="submit"
            >
              Search
            </button>
          </div>
          {error && <p>{error}</p>}
        </div>

        {username && (
          <div className="w-1/2 shadow-xl flex items-center justify-center gap-4 bg-white rounded-sm h-24 mb-32">
            <h2>Number of Repositories: {repos.length}</h2>
            <h2>Number of Followers: {followers.length}</h2>

            <Link
              href={`https://github.com/${username}`}
              className="border-2 p-2 border-[#2E4374] hover:bg-white "
              target="_blank"
            >
              Github profile
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

