import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Info } from "lucide-react";

export default function About() {
  usePageMeta({
    title: "About",
    description: "The story, mission, and principles of Legacy Pathways."
  });

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">About Legacy Pathways</h1>
          <p className="text-xl text-muted/90 font-serif leading-relaxed">
            Preserving the legacy of Māori servicemen connected with Ōhinemutu, Te Arawa, and Muruika Urupā.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">
        
        <section className="prose prose-lg prose-neutral dark:prose-invert max-w-none font-serif text-muted-foreground">
          <h2 className="text-foreground">Our Mission</h2>
          <p>
            [Placeholder text: Legacy Pathways was established to ensure that the sacrifices, stories, and identities of Te Arawa servicemen are never lost to time. We believe that remembering is an active process—one that requires rigorous historical research combined with the deep, personal knowledge held by whānau.]
          </p>
          <p>
            [Placeholder text: Our primary focus is on those interred at Muruika Urupā, the historic military cemetery at Ōhinemutu, though our directory encompasses the wider Te Arawa contribution to international conflicts.]
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-8 border border-border">
            <h3 className="text-xl font-serif mb-4">Editorial Principles</h3>
            <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-4">
              <li><strong className="text-foreground">Accuracy over assumption:</strong> We only publish verified information. Where records conflict, we note the discrepancy rather than guessing.</li>
              <li><strong className="text-foreground">Whānau primacy:</strong> Family knowledge is treated with the same respect as military archives.</li>
              <li><strong className="text-foreground">Cultural dignity:</strong> Te reo Māori macrons and formatting must be correct. Titles and honours must be accurate.</li>
            </ul>
          </div>
          
          <div className="bg-muted p-8 border border-border">
            <h3 className="text-xl font-serif mb-4">Data & Privacy</h3>
            <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-4">
              <li><strong className="text-foreground">No automated publishing:</strong> All submitted stories are moderated before appearing online.</li>
              <li><strong className="text-foreground">Consent:</strong> Whānau retain the right to have information removed from public view.</li>
              <li><strong className="text-foreground">Grave locations:</strong> Detailed grave locations are published only when explicitly cleared, to protect the sanctity of the urupā.</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-16">
          <h2 className="text-3xl font-serif mb-8">Governance & Partners</h2>
          <div className="bg-orange-50 text-orange-900 border border-orange-200 p-4 mb-8 text-sm flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <p><strong>Demonstration Note:</strong> Trust structure, staff lists, iwi endorsements, and funding partners are currently pending formal confirmation and are not listed here to prevent assumption or invention.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border p-6 text-center text-muted-foreground">
              <div className="font-serif text-lg mb-2">Trustees</div>
              <div className="text-sm italic">To be announced</div>
            </div>
            <div className="border border-border p-6 text-center text-muted-foreground">
              <div className="font-serif text-lg mb-2">Research Team</div>
              <div className="text-sm italic">To be announced</div>
            </div>
            <div className="border border-border p-6 text-center text-muted-foreground">
              <div className="font-serif text-lg mb-2">Partners</div>
              <div className="text-sm italic">To be announced</div>
            </div>
          </div>
        </section>

        <section className="border-t pt-16">
          <h2 className="text-3xl font-serif mb-6">Copyright & Permissions</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed">
            <p>
              The materials on this website, including archival photographs and personal accounts, are protected by copyright. 
              Much of the visual material is reproduced with the permission of whānau, the Alexander Turnbull Library, Archives New Zealand, and Manatū Taonga Ministry for Culture and Heritage.
            </p>
            <p>
              Users may not reproduce, distribute, or use these images for commercial purposes without explicit written consent from Legacy Pathways and the respective copyright holders.
            </p>
          </div>
        </section>

      </div>
    </Layout>
  );
}
