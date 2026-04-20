import { Suspense } from "react";
import CardClient from "./CardClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <CardClient />
    </Suspense>
  );
}