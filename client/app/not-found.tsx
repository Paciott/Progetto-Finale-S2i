import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-2 gap-3">
      <h2 className="text-6xl p-3 border-b border-b-purplepink">Not Found</h2>
      <p className="text-lg">
        The page you were looking for doesn&apos;t exist.
      </p>
      <p>
        {" "}
        <Link
          href="/"
          className="hover:underline text-purplepink transition ease-in-out"
        >
          Return Home
        </Link>{" "}
        or{" "}
        <Link
          href="https://www.youtube.com/watch?v=KvE92fCMbmc"
          target="_blank"
          className="hover:underline"
        >
          go see some cute kittens!
        </Link>
      </p>
    </main>
  );
}
