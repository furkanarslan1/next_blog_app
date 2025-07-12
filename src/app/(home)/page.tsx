// import Aside from "./components/aside/Aside";
// import Category_blog from "./components/blogs/Category_blog";

// import Categories from "./components/Categories";
// import Swipper from "./components/Swipper";

// export default function Home() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 ">
//       <div>
//         <Swipper />
//       </div>
//       <div className="pt-14 grid grid-cols-1 md:grid-cols-2 p-8">
//         <Categories />
//         <Aside />
//       </div>
//       <div>
//         <Category_blog />
//       </div>
//     </div>
//   );
// }
import Aside from "./components/aside/Aside";
import Category_blog from "./components/blogs/Category_blog";
import Categories from "./components/Categories";
import Swipper from "./components/Swipper";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 overflow-x-hidden">
      <div className="overflow-hidden">
        <Swipper />
      </div>
      <div className="pt-14 grid grid-cols-1 md:grid-cols-2 p-8 gap-6">
        <Categories />
        <Aside />
      </div>
      <div className="overflow-hidden">
        <Category_blog />
      </div>
    </div>
  );
}
