import Image from "next/image";
import LabBoard from "./lab/lab";
import React, {useContext} from "react";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LabBoard/>
    </main>
  );
}
