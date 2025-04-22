import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Button className="cursor-pointer">
        <Link href="/questionnaire">了解详情</Link>
      </Button>
    </div>
  );
}
