import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Headphones, PlayCircle, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Stories() {
  usePageMeta({
    title: "Stories & Podcasts",
    description: "Oral histories, interviews, and personal accounts of Māori servicemen."
  });

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Stories & Podcasts</h1>
            <p className="text-lg text-muted/90 font-serif leading-relaxed mb-8">
              Listening to the voices of the past, preserved for the future. Explore oral histories, video interviews, and written accounts from kaumātua and whānau.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-24">
        
        {/* Media Grid Placeholder */}
        <section>
          <div className="flex justify-between items-end mb-8 border-b pb-4">
            <h2 className="text-3xl font-serif">Recent Documentaries</h2>
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Demonstration Only</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video bg-muted relative flex items-center justify-center mb-4 overflow-hidden border border-border">
                  <PlayCircle className="h-16 w-16 text-primary/80 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">Demo</div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground uppercase tracking-widest mb-2">
                  <Headphones className="mr-2 h-3 w-3" /> Audio Interview
                </div>
                <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors">Voices of the Battalion: Part {i}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">A recorded interview with surviving members reflecting on their journey from Ōhinemutu to the battlefields of Europe.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Oral History Framework */}
        <section className="bg-card border border-border p-8 lg:p-12 relative overflow-hidden">
          <Quote className="absolute -top-6 -left-6 h-32 w-32 text-muted/20" />
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">Oral History Framework</h2>
            <p className="text-muted-foreground mb-12 text-lg">
              We encourage whānau to record their own stories. Use these guiding questions when speaking with kaumātua about family members who served.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-muted p-6 border-l-4 border-primary">
                <p className="font-serif italic text-lg text-foreground">"What do you remember being told about their childhood?"</p>
              </div>
              <div className="bg-muted p-6 border-l-4 border-primary">
                <p className="font-serif italic text-lg text-foreground">"What led them to enlist?"</p>
              </div>
              <div className="bg-muted p-6 border-l-4 border-primary">
                <p className="font-serif italic text-lg text-foreground">"What stories did they share about their service?"</p>
              </div>
              <div className="bg-muted p-6 border-l-4 border-primary">
                <p className="font-serif italic text-lg text-foreground">"How did their service affect the family?"</p>
              </div>
              <div className="bg-muted p-6 border-l-4 border-primary md:col-span-2 text-center">
                <p className="font-serif italic text-xl text-foreground">"What would you like future generations to know about them?"</p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button onClick={() => window.location.href='/share-a-story'} className="px-8 h-12">
                Submit a Recorded Story
              </Button>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
