import { Trophy, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SponsorsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">感谢支持</h2>
          <p className="text-lg text-muted-foreground">
            感谢以下组织和个人对良心量表项目的支持和贡献
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span>白金赞助者</span>
          </h3>
          <div className="flex justify-center max-w-3xl mx-auto">
            <Link href={"https://lxdao.io"} target="_blank">
              <Image
                src="/logo/lxdao.svg"
                alt="LXDAO Logo"
                width={180}
                height={70}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span>支持者</span>
          </h3>
          <div className="flex justify-center">
            <div className="bg-background border-2 border-dashed border-primary/20 rounded-xl px-8 py-4 text-muted-foreground">虚位以待</div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            您也可以通过 <a href="https://github.com/lxdao-official/lx-scale" target="_blank" className="text-primary hover:underline">GitHub</a> 或 <a href="#" className="text-primary hover:underline">联系我们</a> 支持该项目
          </p>
        </div>
      </div>
    </section>
  );
}
