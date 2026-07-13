import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Button } from "@/components/ui/button";

export default function Shop() {
  usePageMeta({
    title: "Shop",
    description: "Support Legacy Pathways projects by purchasing remembrance items."
  });

  const products = [
    { name: "Remembrance Poppy Pin", price: "$15.00", img: "placeholder" },
    { name: "Legacy Pathways Lapel Badge", price: "$20.00", img: "placeholder" },
    { name: "28th Battalion Historical Print", price: "$45.00", img: "placeholder" },
    { name: "Te Arawa Service Commemorative Book", price: "$65.00", img: "placeholder" },
  ];

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Shop</h1>
          <p className="text-lg text-muted max-w-2xl font-serif">
            All proceeds directly support the ongoing work of Legacy Pathways, including educational resources and the Takrouna carving project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-orange-100 text-orange-900 border border-orange-200 p-4 text-center mb-12 font-medium">
          Note: This is a placeholder store. Online purchasing (Shopify integration) will be available soon. Items shown are samples.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <div key={i} className="group flex flex-col border border-border bg-card">
              <div className="aspect-square bg-muted flex items-center justify-center relative border-b border-border">
                <span className="text-muted-foreground text-sm uppercase tracking-wider">Product Image</span>
                <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">Sample</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif text-lg leading-tight mb-2">{p.name}</h3>
                <div className="text-primary font-medium mt-auto mb-4">{p.price}</div>
                <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
