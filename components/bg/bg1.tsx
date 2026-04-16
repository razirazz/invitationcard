// "use client";

// import Lottie from "lottie-react";
// import animationData from "@/components/bg/bg1.json";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function BackgroundAnimation() {
//   const [key, setKey] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setKey((prev) => prev + 1); // force restart
//     }, 15000); // duration + delay

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-10 overflow-hidden">

//       <motion.div
//         key={key} // 👈 forces clean restart
//         initial={{ x: "110vw" }}
//         animate={{ x: "-40vw" }}
//         transition={{
//           duration: 10,
//           ease: "linear",
//         }}
//         className="absolute bottom-10 w-56 "
//       >
//         <Lottie animationData={animationData} loop />
//       </motion.div>

//     </div>
//   );
// }



// // "wedding couple"
// // "muslim wedding"
// // "nikah animation"