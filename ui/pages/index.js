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

  function handleImage(event) {
    setImage(event.target.files[0]);
  }

  async function handleMint(e) {
    e.preventDefault();

    const form = {
      campaignName,
      image,
      websiteName,
      keywords,
    };

    console.log(form, image);

    const metadata = await storeImage(image);

    console.log(form, metadata);
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
      <section className="mx-auto my-10 w-1/4">
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
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg w-full"
              type="submit"
            >
              Mint campaign
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
