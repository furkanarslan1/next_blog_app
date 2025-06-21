import Aside from "./components/aside/Aside";
import Categories from "./components/Categories";
import Swipper from "./components/Swipper";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <Swipper />
      <div className="pt-14 grid grid-cols-2 p-8">
        <Categories />
        <Aside />
      </div>
    </div>
  );
}
