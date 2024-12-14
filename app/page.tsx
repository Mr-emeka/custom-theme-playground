import Image from "next/image";
import ThemeCustomizer from "../components/ThemeCustomizer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeCustomizer />
    </main>
  );
}
