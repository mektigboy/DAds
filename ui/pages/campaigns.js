import { useEffect, useState } from "react";
import OrbitDB from "orbit-db";
import AppHeader from "../components/AppHeader";
import { createIPFSInstance } from "../database";
import Link from "next/link";
export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    createIPFSInstance().then((ipfs) => {
      console.log(ipfs);
      OrbitDB.createInstance(ipfs).then(async (orbitdb) => {
        console.log(orbitdb);
        const db = await orbitdb.feed("testdb");
        await db.load();
        const result = db.iterator({ limit: -1 }).collect();
        console.log(result);
        setCampaigns(result);
      });
    });
  }, []);

  return (
    <div>
      <AppHeader />
      <section className="mx-auto my-10 w-2/3">
        <div className="border border-gray-300 rounded-lg">
          <table className="table-auto w-full">
            <thead className="bg-gray-300">
              <tr>
                <th className="p-4 text-left">Campaign Name</th>
                <th className="p-4 text-left">Website</th>
                <th className="p-4 text-left">Keywords</th>
                <th className="p-4 text-left">Demography</th>
                <th className="p-4 text-left">Budget</th>
                <th className="p-4 text-left">Start Date</th>
                <th className="p-4 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, campaignIndex) => (
                <tr key={campaignIndex}>
                  <td className="px-4 py-2">
                    <Link href={`campaign/${campaign.hash}`}>
                      <span className="cursor-pointer text-blue-500 hover:text-blue-400">
                        {campaign.payload.value.campaignName}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    {campaign.payload.value.websiteName}
                  </td>
                  <td className="px-4 py-2">
                    {campaign.payload.value.keywords}
                  </td>
                  <td className="px-4 py-2">
                    {campaign.payload.value.demography}
                  </td>
                  <td className="px-4 py-2">
                    ${campaign.payload.value.budget}
                  </td>
                  <td className="px-4 py-2">
                    {campaign.payload.value.startDate}
                  </td>
                  <td className="px-4 py-2">
                    {campaign.payload.value.endDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
