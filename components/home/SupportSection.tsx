import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function SupportSection() {
  return (
    <section className="py-16">
      <div className="container px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">支持我们</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="w-48 h-48 border flex items-center justify-center">
            Bogda图片
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-medium mb-4">感恩助学</h3>
            <p className="text-muted-foreground mb-6">
              XXXXXXXXXXXXXXXX
              XXXXXXXXXXXXXXXX
              XXXXXXXXXXXXXXXX
              XXXXXXX
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              Connect Wallet
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
