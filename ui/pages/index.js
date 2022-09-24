import { useState } from "react";
import { NFTStorage, File, Blob } from "nft.storage";
import AppHeader from "../components/AppHeader";

export default function Home() {
  const NFT_STORAGE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUwNTI3YTY5NGIwMjk5REYzZDYxNkQ3MjZGOEY1RkYwRDY1NkRGYkIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2Mzk4MTU5ODUzNiwibmFtZSI6ImV0aGdsb2JhbCJ9.Za9BNtqZf7Cy4QQiatrGSlKcQ_BAq3Lj3bSd8TksIR8";

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

  const [campaignName, setCampaignName] = useState("");
  const [image, setImage] = useState(undefined);
  const [websiteName, setWebsiteName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [demography, setDemography] = useState("");

  const [budget, setBudget] = useState(0);

  const [imageMetadata, setImageMetadata] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  function handleImage(event) {
    setImage(event.target.files[0]);
  }

  async function handleMint(e) {
    e.preventDefault();
    setIsLoading(true);

    const form = {
      campaignName,
      image,
      websiteName,
      keywords,
    };

    const metadata = await storeImage(image);
    console.log(metadata);
    setImageMetadata(metadata);
  }

  async function storeImage(imageFile) {
    const metadata = await client.store({
      name: "Test 1",
      description: "Description 1",
      metadata: {
        s_image: 0,
        s_name: 0,
        s_website: 0,
        s_keywords: 0,
        s_demography: 0,
        s_budget: 0,
      },
      image: imageFile,
    });

    return metadata;
  }

  return (
    <div>
      <AppHeader />
      <section className="mx-auto my-10 w-1/3">
        <div className="step-1">
          <h2 className="font-semibold text-2xl">Create new campaign</h2>
          <form onSubmit={handleMint}>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Image<span className="text-red-500">*</span>
              </label>
              <small className="text-gray-600 my-1">
                Supported Dimensaions: 1:1 and 4:3. Supported file types: png,
                jpg, jpeg, bmp
              </small>
              <input
                className="p-3 border border-grey-300 rounded-lg"
                type="file"
                onChange={handleImage}
                required
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Campaign Name<span className="text-red-500">*</span>
              </label>
              <input
                className="p-3 border border-grey-300 rounded-lg"
                type="text"
                placeholder="eg. Your first campaign"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Website name<span className="text-red-500">*</span>
              </label>
              <input
                className="p-3 border border-grey-300 rounded-lg"
                type="text"
                placeholder="Enter  the campaign website"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Keywords<span className="text-red-500">*</span>
              </label>
              <small className="text-gray-600 my-1">
                Min 3 required, they helps us categorise and manage
              </small>
              <input
                className="p-3 border border-grey-300 rounded-lg"
                type="text"
                placeholder="Enter keywords separated by spaces"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                required
              />
            </div>
            <div className="my-4">
              <button
                className="bg-blue-500 hover:bg-blue-400 disabled:opacity-25 text-white px-6 py-3 rounded-lg w-full"
                type="submit"
                disabled={isLoading}
              >
                Mint campaign
              </button>
            </div>
          </form>
        </div>
        <div className="step-2">
          <h2 className="font-semibold text-2xl">Setup your campaign</h2>
          <div className="flex flex-wrap my-4">
            <div className="w-1/6">
              <img
                className="w-full rounded-lg"
                src={imageMetadata?.data?.image?.href.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                onLoad={() => setIsLoading(false)}
              />
            </div>
            <div className="w-5/6 px-2">Campaign name: {campaignName}</div>
          </div>
          <div className="text-yellow-500 underline text-sm">
            <a href="#">Minting in progress →</a>
          </div>
          <div className="text-gray-500 text-sm">{keywords}</div>
          <form>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Demography<span className="text-red-500">*</span>
              </label>
              <input
                className="p-3 border border-grey-300 rounded-lg"
                type="text"
                placeholder="Type in countries"
                value={demography}
                onChange={(e) => setDemography(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Budget<span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  className="p-3 border border-grey-300 rounded-lg w-3/4"
                  type="number"
                  placeholder="Enter amount in USDC"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
                <div className="1/4 flex items-center px-4">
                  <img
                    className="w-full h-8"
                    src="https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col my-4">
              <label className="my-1">
                Duration<span className="text-red-500">*</span>
              </label>
              <div className="flex my-3">
                <div className="w-1/2 pr-6">
                  <label className="pl-2">From</label>
                  <input
                    className="p-3 border border-grey-300 rounded-lg"
                    type="date"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>
                <div className="w-1/2 pl-6">
                  <label className="pl-2">To</label>
                  <input
                    className="p-3 border border-grey-300 rounded-lg"
                    type="date"
                    placeholder="To"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="my-4">
              <button
                className="text-blue-500 hover:text-blue-400 disabled:opacity-25 px-6 py-3 rounded-lg w-1/2"
                type="button"
              >
                Submit later
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-400 disabled:opacity-25 text-white px-6 py-3 rounded-lg w-1/2"
                type="submit"
                disabled={isLoading}
              >
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
