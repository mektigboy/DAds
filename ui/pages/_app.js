import "../styles/globals.css";
import { create as ipfsCreate } from "ipfs";
import OrbitDB from "orbit-db";
import { useEffect } from "react";

// let ipfs;
// let orbitdb;
// let db;

// (async function () {
//   ipfs = await ipfsCreate();
//   orbitdb = await OrbitDB.createInstance(ipfs);

//   // Create / Open a database
//   db = await orbitdb.log("hello");
//   await db.load();

//   // Listen for updates from peers
//   db.events.on("replicated", (address) => {
//     console.log(db.iterator({ limit: -1 }).collect());
//   });

//   // Add an entry
//   const hash = await db.add("world");
//   console.log(hash);

//   // Query
//   const result = db.iterator({ limit: -1 }).collect();
//   console.log(JSON.stringify(result, null, 2));
// })();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
