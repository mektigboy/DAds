import { create as ipfsCreate } from "ipfs";

export async function createIPFSInstance() {
  const ipfs = await ipfsCreate();
  return ipfs;
}
