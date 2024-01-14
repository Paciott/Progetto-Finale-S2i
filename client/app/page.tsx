import Burger from "@/components/Burger";
import HomeFeed from "@/components/HomeFeed";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 items-start p-6">
      <div className="flex flex-col items-center justify-center p-3 sm:block">
        <Burger isPostingFromProfileSection={false} />
      </div>
      <div className="max-w-2xl flex flex-col gap-3 col-span-2">
        <HomeFeed />
      </div>
    </main>
  );
}
