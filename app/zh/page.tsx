"use client";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useT, useHref } from "@/hooks/useGetLang";

export default function Home() {
  const T = useT();
  const href = useHref();
  return (
    <div className="flex flex-col min-h-screen">
      <Button className="cursor-pointer">
        <Link href={href("/questionnaire")}>
          {T({ en: "Learn More", zh: "了解详情" })}
        </Link>
      </Button>
    </div>
  );
}
