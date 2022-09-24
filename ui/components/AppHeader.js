import Link from "next/link";
import { useState } from "react";
import { ethers } from "ethers";
export default function AppHeader() {
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");

  async function connectWallet() {
    if (!currentWalletAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        setCurrentWalletAddress(accounts[0]);
      }
    }
  }

  return (
    <header className="flex items-center py-4 pl-12 pr-4">
      <div className="flex-1 h-12">
        <Link href="/">
          <img className="h-full" src="logo.png" />
        </Link>
      </div>
      <div className="mx-12">
        <ul className="flex">
          <li className="text-blue-500 hover:text-blue-400 mx-6">
            <Link href="/about">Campaigns</Link>
          </li>
          <li className="text-blue-500 hover:text-blue-400 mx-6">
            <Link href="/">New Campaign</Link>
          </li>
          <li className="text-blue-500 hover:text-blue-400 mx-6">
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </div>
      <div className="rounded-full h-8 px-2 relative">
        <div
          className={
            currentWalletAddress
              ? "bg-green-500 rounded-full"
              : "bg-gray-300 rounded-full"
          }
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 8,
            height: 8,
          }}
        ></div>
        <img
          className="h-full"
          src="https://s2.coinmarketcap.com/static/img/coins/200x200/11840.png"
        />
      </div>
      <div>
        <button
          className="py-3 px-4 bg-blue-500 hover:bg-blue-400 text-white rounded-lg"
          onClick={connectWallet}
        >
          {currentWalletAddress
            ? `Connected - ${currentWalletAddress.substring(0, 5)}...`
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}
