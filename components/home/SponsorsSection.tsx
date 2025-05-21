import { Building, Trophy, Award } from "lucide-react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-background border rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium">LXDAO</h4>
                <p className="text-sm text-muted-foreground">虚拟世界中的公共品质建设者</p>
              </div>
            </div>
            <div className="bg-background border rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium">ABC心理学会</h4>
                <p className="text-sm text-muted-foreground">专业心理健康研究与服务机构</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center justify-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span>支持者</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-background border rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow">张三</div>
            <div className="bg-background border rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow">李四</div>
            <div className="bg-background border rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow">王五</div>
            <div className="bg-background border rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow">赵六</div>
            <div className="bg-background border rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow">孙七</div>
            <div className="bg-background border rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-shadow">周八</div>
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
