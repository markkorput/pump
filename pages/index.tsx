import Link from "next/link";

export const Index = () => {
  return (
    <>
      <Link href="/timer">Timer</Link>
      <br />
      <Link href="/intervals">Intervals</Link>
    </>
  );
};

export default Index;
