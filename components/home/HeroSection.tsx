import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] py-16 flex items-center">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="space-y-6">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              免费 · 开源 · 无隐藏收费
            </div>
            <h1 className="text-5xl font-bold leading-tight">良心量表</h1>
            <p className="text-xl text-muted-foreground">
              专业的心理健康自评工具，帮助您了解自己的心理状态
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/questionnaire">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg gap-2 w-full sm:w-auto"
                  asChild
                >
                  <span>
                    开始测试 <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </Link>
              <Link
                href="https://github.com/lxdao-official/lx-scale"
                target="_blank"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg w-full sm:w-auto"
                >
                  查看源代码
                </Button>
              </Link>
            </div>

            <div className="flex gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">完全免费</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm">本地处理</span>
              </div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="bg-muted/50 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">项目初衷</h2>
            <div className="prose text-sm space-y-4">
              <p>
                当前市场存在大量付费心理评估服务，这些服务通过 SEO
                技术占据搜索结果前列，但实际上许多评估问卷本身是开源且免费的。
              </p>
              <p>
                这种商业模式对正在寻求心理健康支持的人群造成了不必要的经济负担（特别是填完了才发现要付费获取结果真的会把人气晕掉）。
              </p>
              <p>
                <strong>良心量表旨在打破这一壁垒</strong>
                ，提供真正免费、无隐藏收费的心理评估服务，让每个人都能获得基本的心理健康评估资源。
              </p>
              <p>
                本项目完全符合 LX
                精神，通过技术赋能心理健康领域，虚拟世界中的公共品质建设。
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-sm text-muted-foreground border-t pt-8">
          <p className="mb-2">
            良心量表收集了多种专业心理评估工具，包括 SCL-90
            症状自评量表、抑郁自评量表等，所有测评均基于心理学研究和临床实践。
          </p>
          <p className="mb-2 font-medium">
            测评结果仅供参考，不构成医疗诊断。如有严重心理健康问题，请咨询专业心理医生或精神科医师。
          </p>
          <p>所有数据均在本地处理，我们不会收集您的个人信息或测评结果。</p>
        </div>
      </div>
    </section>
  );
}
