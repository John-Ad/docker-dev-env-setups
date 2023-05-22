"use client"

import React, { useState } from "react";

export default function SignInPage(
    {
        params,
        searchParams,
    }: {
        params: { slug: string };
        searchParams: { [key: string]: string | string[] | undefined };
    }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        console.log("Signing in...");
    }


    return (
        <div className="min-h-screen min-w-full">
            <h1 className="ml-[auto] mr-[auto] text-center text-3xl mb-4">Sign In:</h1>
            <form className="flex bg-slate-100 rounded shadow p-10 flex-col items-center center w-[300px] ml-[auto] mr-[auto]">
                <label className="p-2 pt-0" htmlFor="username">Email</label>
                <input className="required focus:ring-3 border rounded" onChange={(e) => {
                    setUsername(e.target.value);
                }} type="text" id="username" name="username" value={username} placeholder="example@gmail.com" />
                <label className="mt-5 p-2" htmlFor="password">Password</label>
                <input className="required border rounded" onChange={(e) => {
                    setPassword(e.target.value);
                }} type="password" id="password" name="password" value={password} placeholder="****" />

                <button className=" mt-4 pl-5 pr-5 pt-1 pb-1 text-white rounded-full bg-orange-500">Sign in</button>
            </form>
        </div>
    );
}
