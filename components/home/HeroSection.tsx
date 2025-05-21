import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-16 border-b">
      <div className="container px-4 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">良心量表</h1>
        <p className="text-lg text-muted-foreground mb-6">
          一句话的介绍一句话的介绍一句话的介绍一句话的介绍一句话的介绍
        </p>
        <div className="flex justify-center">
          <Link href="/questionnaire">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <span>开始测试</span>
            </Button>
          </Link>
        </div>
        <div className="mt-8 text-xs text-muted-foreground">
          这里是一些关于量表的说明文字 这里是一些关于量表的说明文字 这里是一些关于量表的说明文字 这里是一些关于量表的说明文字
          这里是一些关于量表的说明文字 这里是一些关于量表的说明文字 这里是一些关于量表的说明文字 这里是一些关于量表的说明文字
          这里是一些关于量表的说明文字 这里是一些关于量表的说明文字 这里是一些关于量表的说明文字 这里是一些关于量表的说明文字
        </div>
      </div>
    </section>
  );
}
