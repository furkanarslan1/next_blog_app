// "use client";

// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";

// interface CommentType {
//   id: number;
//   content: string;
//   post?: {
//     title: string;
//   };
// }

// export default function UserComments() {
//   const params = useParams();
//   const username = params.username;
//   const [comments, setComments] = useState<CommentType[]>([]);

//   useEffect(() => {
//     if (!username) return;
//     fetch(`/api/users/${username}/comments`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Comments data:", data);
//         setComments(data);
//       });
//   }, [username]);

//   const handleDelete = async (commentId: number) => {
//     const confirmed = confirm("Are you sure ?");
//     if (!confirmed) return;

//     try {
//       const res = await fetch(`/api/comments/${commentId}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         setComments((prev) =>
//           prev.filter((comment) => comment.id !== commentId)
//         );
//       } else {
//         alert("Error");
//       }
//     } catch (error) {
//       alert("Something went wrong");
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-center border-b-1 pb-2 mb-4">
//         Your Comments
//       </h1>
//       {comments.length === 0 ? (
//         <div>There is no comment</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {comments.map((comment: any) => (
//             <div
//               key={comment.id}
//               className="border-1 rounded-2xl p-4 flex items-center justify-between gap-4"
//             >
//               <div>
//                 <p className="font-bold underline">
//                   Blog: {comment.post?.title}
//                 </p>
//                 <p>{comment.content}</p>
//               </div>

//               <button
//                 onClick={() => handleDelete(comment.id)}
//                 className="text-2xl cursor-pointer hover:text-red-500 transition-all duration-400"
//               >
//                 <MdDelete />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface CommentType {
  id: number;
  content: string;
  post?: {
    title: string;
  };
}

export default function UserComments() {
  const params = useParams();

  // 1. params.username her zaman string olmayabilir
  const username =
    typeof params.username === "string"
      ? params.username
      : Array.isArray(params.username)
        ? params.username[0]
        : undefined;

  const [comments, setComments] = useState<CommentType[]>([]);

  // 2. username hazır olmadan fetch atma
  useEffect(() => {
    if (!username) return;

    fetch(`/api/users/${username}/comments`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Comments data:", data);
        setComments(data);
      });
  }, [username]);

  const handleDelete = async (commentId: number) => {
    const confirmed = confirm("Are you sure?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center border-b-1 pb-2 mb-4">
        Your Comments
      </h1>
      {comments.length === 0 ? (
        <div>There is no comment</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {comments.map((comment: any) => (
            <div
              key={comment.id}
              className="border-1 rounded-2xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold underline">
                  Blog: {comment.post?.title}
                </p>
                <p>{comment.content}</p>
              </div>

              <button
                onClick={() => handleDelete(comment.id)}
                className="text-2xl cursor-pointer hover:text-red-500 transition-all duration-400"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
