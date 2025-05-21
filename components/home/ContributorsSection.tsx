import { Code, Lightbulb, Palette, Heart, Star, Github } from "lucide-react";

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  github?: string;
}

export function ContributorsSection() {
  // 模拟贡献者数据
  const contributors: Contributor[] = [
    { name: "张三", role: "开发者", avatar: "ZS", github: "zhangsan" },
    { name: "李四", role: "设计师", avatar: "LS", github: "lisi" },
    { name: "王五", role: "心理学家", avatar: "WW", github: "wangwu" },
    { name: "赵六", role: "开发者", avatar: "ZL", github: "zhaoliu" },
    { name: "孙七", role: "内容编辑", avatar: "SQ", github: "sunqi" },
    { name: "周八", role: "测试工程师", avatar: "ZB", github: "zhouba" },
    { name: "吴九", role: "开发者", avatar: "WJ", github: "wujiu" },
    { name: "郑十", role: "设计师", avatar: "ZS", github: "zhengshi" },
  ];
  
  // 根据角色获取图标
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "开发者":
        return <Code className="h-4 w-4 text-primary" />;
      case "设计师":
        return <Palette className="h-4 w-4 text-primary" />;
      case "心理学家":
        return <Lightbulb className="h-4 w-4 text-primary" />;
      case "内容编辑":
        return <Star className="h-4 w-4 text-primary" />;
      case "测试工程师":
        return <Heart className="h-4 w-4 text-primary" />;
      default:
        return <Star className="h-4 w-4 text-primary" />;
    }
  };
  
  return (
    <section className="py-24">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">项目贡献者</h2>
          <p className="text-lg text-muted-foreground">
            感谢所有为良心量表项目做出贡献的开发者、设计师和心理学家
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {contributors.map((contributor, index) => (
            <div key={index} className="bg-background border rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium mb-3">
                {contributor.avatar}
              </div>
              <h3 className="font-medium">{contributor.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                {getRoleIcon(contributor.role)}
                <span>{contributor.role}</span>
              </div>
              {contributor.github && (
                <a 
                  href={`https://github.com/${contributor.github}`} 
                  target="_blank" 
                  className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline"
                >
                  <Github className="h-3 w-3" />
                  <span>{contributor.github}</span>
                </a>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            您也可以成为贡献者！访问我们的 <a href="https://github.com/lxdao-official/lx-scale" target="_blank" className="text-primary hover:underline">GitHub 仓库</a> 了解如何参与。
          </p>
        </div>
      </div>
    </section>
  );
}
