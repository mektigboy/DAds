import AppHeader from "../../components/AppHeader";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import campaignAbi from "../../utils/campaignABI.json";
import { CopyBlock, codepen } from "react-code-blocks";

export default function Snippet() {
  const router = useRouter();
  const [campaign, setCampaign] = useState({});

  async function getCampaign(_contract) {
    /*
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "jsonrpc": "2.0",
          "method": "tableland_runReadQuery",
          "id": 1,
          "params": [
            {
              "statement": "SELECT * FROM dads_420_133"
            }
          ]
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://testnet.tableland.network/rpc", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://floral-attentive-choice.optimism-goerli.discover.quiknode.pro/fd2865138bfd176038a2da7452a6143b4b9e6175/"
    );
    const contract = new ethers.Contract(_contract, campaignAbi, provider);
    const website = await contract.getCampaignWebsite();
    const image = await contract.getCampaignImage();

    setCampaign({ website, image });

    return campaign;
  }

  useEffect(() => {
    const { contract } = router.query;
    getCampaign(contract);
  }, []);

  const snippet = `
    <campaignWebsite>${campaign.website}</campaignWebsite>
    <campaignImage>
      ${campaign.image}
    </campaignImage>
  `;

  return (
    <div>
      <AppHeader />
      <section className="mx-auto my-10 w-2/3">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-1/3 px-4">
            <img
              src={campaign?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")}
            />
          </div>
          <div className="w-2/3 px-4">
            <CopyBlock
              text={snippet}
              language="html"
              theme={codepen}
              wrapLines
            />
          </div>
        </div>
      </section>
    </div>
  );
}
