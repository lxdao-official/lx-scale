import { Button } from "@/components/ui/button";
import { ExternalLink, Wallet, Github, Heart, Mail } from "lucide-react";

export function SupportSection() {
  return (
    <section className="py-24 bg-muted/20 rounded-t-3xl">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">支持良心量表</h2>
          <p className="text-lg text-muted-foreground">
            您的支持将帮助我们维护和改进这个免费开源的心理健康工具
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-background border rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col items-center lg:items-start">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">心理健康公益基金</h3>
            <p className="text-muted-foreground mb-6 text-center lg:text-left">
              我们设立了心理健康公益基金，用于支持心理健康教育、研究和免费心理咨询服务。您的捐赠将直接用于帮助那些无法负担心理健康服务费用的人。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>捐赠支持</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>联系我们</span>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-primary/5 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">LX</div>
                <div className="text-sm text-muted-foreground">良心量表项目</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <Github className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">开源贡献</h3>
            <p className="text-sm text-muted-foreground mb-4">
              如果您是开发者，可以通过代码贡献、问题报告或功能建议来支持我们。
            </p>
            <a 
              href="https://github.com/lxdao-official/lx-scale"
              target="_blank"
              className="text-primary text-sm hover:underline flex items-center gap-1"
            >
              <span>访问 GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          
          <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <Heart className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">分享传播</h3>
            <p className="text-sm text-muted-foreground mb-4">
              帮助我们将良心量表分享给更多需要心理健康资源的人，让更多人受益。
            </p>
            <Button variant="ghost" size="sm" className="text-primary">
              分享项目
            </Button>
          </div>
          
          <div className="bg-background border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">反馈建议</h3>
            <p className="text-sm text-muted-foreground mb-4">
              您的反馈对我们非常重要，帮助我们改进量表的准确性和用户体验。
            </p>
            <Button variant="ghost" size="sm" className="text-primary">
              提交反馈
            </Button>
          </div>
        </div>
        
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            良心量表是一个非盈利项目，所有捐赠将用于维护和改进该项目。
          </p>
        </div>
      </div>
    </section>
  );
}
