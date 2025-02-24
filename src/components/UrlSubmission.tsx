
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UrlSubmissionProps {
  onUrlChange: (urls: string[]) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UrlSubmission = ({ onUrlChange, onSubmit }: UrlSubmissionProps) => (
  <section className="glass-panel p-6 fade-enter" style={{ animationDelay: "0.4s" }}>
    <h2 className="text-xl font-semibold mb-4">Enviar URLs</h2>
    <form onSubmit={onSubmit}>
      <div className="flex gap-4">
        <Input
          placeholder="Digite uma URL ou cole múltiplas URLs"
          className="flex-1"
          onChange={(e) => {
            const newUrls = e.target.value
              .split("\n")
              .map((url) => url.trim())
              .filter(Boolean);
            onUrlChange(newUrls);
          }}
        />
        <Button type="submit" className="bg-accent hover:bg-accent-hover text-white">
          Enviar para Indexação
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Digite uma URL por linha ou cole múltiplas URLs
      </p>
    </form>
  </section>
);
