import AppHeader from "../components/AppHeader";

export default function AboutUs() {
  return (
    <div>
      <AppHeader />
      <section className="mx-auto my-10 w-2/3">
        <div className="flex justify-center">
          <img src="about.png" />
        </div>
      </section>
    </div>
  );
}
