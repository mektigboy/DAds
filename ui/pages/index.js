export default function Home() {
  return (
    <div>
      <header>Dads</header>
      <section className="mx-auto my-8 w-1/4">
        <h2 className="font-semibold text-3xl">Create new campaign</h2>
        <form>
          <div className="flex flex-col my-4">
            <label>
              Image<span className="text-red-500">*</span>
            </label>
            <small>
              Supported Dimensaions: 1:1 and 4:3. Supported file types: png,
              jpg, jpeg, bmp
            </small>
            <input class="p-3 border border-grey-300 rounded" type="file" />
          </div>
          <div className="flex flex-col my-4">
            <label>
              Campaign Name<span className="text-red-500">*</span>
            </label>
            <input
              class="p-3 border border-grey-300 rounded"
              type="text"
              placeholder="eg. Your first campaign"
            />
          </div>
          <div className="flex flex-col my-4">
            <label>
              Website name<span className="text-red-500">*</span>
            </label>
            <input
              class="p-3 border border-grey-300 rounded"
              type="text"
              placeholder="Enter  the campaign website"
            />
          </div>
          <div className="flex flex-col my-4">
            <label>
              Keywords<span className="text-red-500">*</span>
            </label>
            <small>Min 3 required, they helps us categorise and manage</small>
            <input
              class="p-3 border border-grey-300 rounded"
              type="text"
              placeholder="Enter keywords separated by spaces"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded w-full"
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
