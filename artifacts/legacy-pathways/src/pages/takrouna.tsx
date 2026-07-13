import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import takrounaBg from "../assets/takrouna-bg.png";

export default function Takrouna() {
  usePageMeta({
    title: "Takrouna Carving Project",
    description: "A memorial carving destined for Takrouna, Tunisia to honour the Māori Battalion."
  });

  const timeline = [
    { phase: "Phase 1", title: "Consultation", status: "completed", desc: "[Placeholder: Whānau and iwi consultation regarding the scope and intent of the memorial.]" },
    { phase: "Phase 2", title: "Design", status: "in-progress", desc: "[Placeholder: Master carvers developing the narrative and structural design of the piece.]" },
    { phase: "Phase 3", title: "Material Selection", status: "pending", desc: "[Placeholder: Sourcing appropriate tōtara or suitable timber for the environment.]" },
    { phase: "Phase 4", title: "Carving", status: "pending", desc: "[Placeholder: The physical carving process in Aotearoa.]" },
    { phase: "Phase 5", title: "Community Presentation", status: "pending", desc: "[Placeholder: Unveiling the completed work to the community before transit.]" },
    { phase: "Phase 6", title: "Transport to Tunisia", status: "pending", desc: "[Placeholder: Logistics of safely transporting the carving to North Africa.]" },
    { phase: "Phase 7", title: "Installation & Dedication", status: "pending", desc: "[Placeholder: Siting at Takrouna and official dedication ceremony.]" },
  ];

  return (
    <Layout>
      <section className="relative w-full h-[50vh] flex items-center bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={takrounaBg} 
            alt="Carving workshop" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
        </div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4">
              Takrouna Carving Project
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-serif">
              Honouring the legacy of the 28th Māori Battalion in North Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-7 space-y-8 text-lg font-serif text-muted-foreground leading-relaxed">
          <h2 className="text-3xl font-serif text-foreground mb-8">A Memorial for Takrouna</h2>
          
          <p>
            [Placeholder text: The battle for Takrouna in April 1943 was one of the fiercest engagements fought by the 28th Māori Battalion during the North African campaign. The bravery demonstrated there, notably by Sgt. Haane Manahi, remains a cornerstone of Te Arawa military history.]
          </p>
          <p>
            [Placeholder text: This project aims to create a significant Māori carving (pou or waharoa) in Aotearoa, which will be transported and installed at Takrouna, Tunisia. It will stand as a permanent marker of the blood spilt and the bonds forged on that rocky outcrop.]
          </p>
          <p>
            [Placeholder text: The carving will be conceptualised not just as a monument to the fallen, but as a cultural bridge between Aotearoa and Tunisia. The design process will be highly collaborative, ensuring the narrative embedded in the wood speaks truthfully of sacrifice, honour, and peace.]
          </p>

          <div className="bg-muted p-8 mt-12 border border-border">
            <h3 className="font-serif text-xl text-foreground mb-4">Support the Project</h3>
            <p className="text-sm mb-6">
              [Placeholder text: This ambitious undertaking requires support from the community. If you wish to contribute to the funding or logistics of the Takrouna Carving Project, please get in touch.]
            </p>
            <Link href="/contact?subject=Takrouna Carving Support">
              <Button>Contact the Project Team</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <h3 className="text-2xl font-serif mb-8 border-b pb-4">Project Timeline</h3>
          <div className="space-y-6">
            {timeline.map((step, i) => (
              <div key={i} className={`relative pl-8 pb-6 border-l-2 ${step.status === 'completed' ? 'border-primary' : step.status === 'in-progress' ? 'border-primary border-dashed' : 'border-border'}`}>
                <div className={`absolute -left-2 top-0 w-3.5 h-3.5 rounded-full bg-background border-2 ${step.status === 'completed' ? 'border-primary bg-primary' : step.status === 'in-progress' ? 'border-primary' : 'border-border'}`}></div>
                <div className="text-xs uppercase tracking-widest font-medium text-muted-foreground mb-1">{step.phase}</div>
                <h4 className={`text-lg font-serif mb-2 ${step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
