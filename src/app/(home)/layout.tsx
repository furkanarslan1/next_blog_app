// import React, { ReactNode } from "react";

// export default function layout({ children }: { children: ReactNode }) {
//   return (
//     <div className="max-w-7xl mx-auto px-4 ">
//       <main>{children}</main>
//     </div>
//   );
// }

// import React, { ReactNode } from "react";

// export default function layout({ children }: { children: ReactNode }) {
//   return (
//     <html>
//       <body className="overflow-x-hidden">
//         <div className="max-w-7xl mx-auto px-4">
//           <main>{children}</main>
//         </div>
//       </body>
//     </html>
//   );
// }

import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 overflow-hidden">{children}</div>
  );
}
