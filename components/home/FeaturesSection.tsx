import { GithubIcon, Brain, Lock, LineChart, Users, HeartHandshake } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">为什么选择良心量表？</h2>
          <p className="text-lg text-muted-foreground">
            我们致力于打造最优质的心理评估工具，并保证它对所有人免费开放
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <GithubIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">完全开源</h3>
            <p className="text-muted-foreground">
              我们的所有代码都在 GitHub 上公开可见，欢迎任何人贡献和改进。我们相信开源精神能够帮助我们共同打造更好的心理健康工具。
            </p>
          </div>
          
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">专业量表</h3>
            <p className="text-muted-foreground">
              所有量表均基于心理学研究和临床实践，包括 SCL-90、抑郁自评量表等国际公认的心理评估工具，确保评估结果的专业性和参考价值。
            </p>
          </div>
          
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">隐私保护</h3>
            <p className="text-muted-foreground">
              所有数据均在您的浏览器中本地处理，我们不会收集或存储您的任何个人信息或测评结果。您的隐私安全是我们的首要考虑。
            </p>
          </div>
          
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">数据可视化</h3>
            <p className="text-muted-foreground">
              我们提供直观清晰的数据可视化展示，帮助您更好地理解自己的心理状态。包括因子分析、维度对比和趋势分析等多种图表。
            </p>
          </div>
          
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">社区驱动</h3>
            <p className="text-muted-foreground">
              良心量表由开发者、心理学家和设计师组成的多元化社区共同建设，我们欢迎所有人加入并为项目贡献力量。我们使用 <a href="https://fairsharing.xyz/" target="_blank" className="text-primary hover:underline">FairSharing</a> 记录每个人的贡献，并进行公平分配。
            </p>
          </div>
          
          <div className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-6">
              <HeartHandshake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">心理健康资源</h3>
            <p className="text-muted-foreground">
              除了评估工具，我们还提供丰富的心理健康资源和建议，帮助您找到适合的心理支持和自我提升方法。
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">共同建设更好的心理健康生态系统</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            我们相信心理健康资源应该对所有人开放。通过开源协作，我们可以共同创造一个更加健康、包容和支持的社会。
          </p>
        </div>
      </div>
    </section>
  );
}
