"use client";
import Link from "next/link";
import { useState } from "react";

export function requestUserRepos(username: string) {
  // create a variable to hold the `Promise` returned from `fetch`
  return Promise.resolve(
    fetch(`https://api.github.com/users/${username}/repos`)
  );
}

export function requestUserFollowers(username: string) {
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
    <main className="flex flex-col h-screen items-center justify-between py-24 bg-[#F0F0F0] text-[#2E4374] w-full">
      <div className="bg-[#9EDDFF] w-1/3 flex flex-col items-center justify-between rounded-lg h-1/3 py-8">
        <h1>Search for GitHub Profile!</h1>
        <input
          type="text"
          placeholder="Type GitHub username"
          className="border-2 border-[#2E4374] w-5/6 placeholder:px-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button
          className="border-2 border-[#2E4374] w-1/6 bg-white duration-300 hover:scale-110"
          onClick={handleSearch}
          type="submit"
        >
          Search
        </button>
        {error && <p>{error}</p>}
      </div>
      <div>
        <h2>Number of Repositories: {repos.length}</h2>
        <h2>Number of Followers: {followers.length}</h2>
      </div>
      <Link
        href={`https://github.com/${username}`}
        className="border-2 p-2 border-[#2E4374] hover:bg-white"
        target="_blank"
      >
        Github profile
      </Link>
    </main>
  );
}
