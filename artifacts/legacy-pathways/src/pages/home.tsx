import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useGetFeaturedPeople, useGetPeopleStats } from "@workspace/api-client-react";
import { ArrowRight, BookOpen, MapPin, Mic, Compass, Search } from "lucide-react";
import heroBg from "../assets/hero-bg.png";

export default function Home() {
  usePageMeta({
    title: "Home",
    description: "Their service. Their stories. Their legacy. Legacy Pathways preserves the stories of Māori servicemen."
  });

  const { data: featuredPeople } = useGetFeaturedPeople();
  const { data: stats } = useGetPeopleStats();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroBg} 
            alt="Solemn memorial landscape" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 px-4 pt-20 pb-32 mx-auto">
          <div className="max-w-3xl">
            <span className="uppercase tracking-widest text-primary font-bold text-sm mb-6 block">Legacy Pathways</span>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
              Their service.<br />
              Their stories.<br />
              <span className="text-gray-400">Their legacy.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-serif">
              Connecting Te Arawa servicemen, Muruika Urupā, and future generations through respectful remembrance and shared history.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/our-people" className="inline-flex h-12 items-center justify-center bg-primary text-white px-8 text-sm font-medium transition-colors hover:bg-primary/90">
                Explore Our People <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex h-12 items-center justify-center bg-white/10 text-white backdrop-blur px-8 text-sm font-medium transition-colors hover:bg-white/20 border border-white/20">
                About the Organisation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Stats / Intro */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">Muruika Urupā</h2>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground leading-relaxed mb-6 font-serif text-lg">
                Situated on the historic shores of Lake Rotorua at Ōhinemutu, Muruika Urupā stands as a sacred resting place. It is a place of profound significance where many Te Arawa servicemen are interred.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Legacy Pathways is dedicated to preserving the precise records, verified histories, and personal narratives of those who served, ensuring their legacy endures for kaumātua, whānau, and students.
              </p>
              <Link href="/our-people?buriedAtMuruika=true" className="inline-flex items-center text-primary font-medium hover:underline">
                View servicemen at Muruika Urupā <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-secondary text-secondary-foreground p-10 lg:p-12 relative overflow-hidden">
              <Compass className="absolute -right-8 -bottom-8 h-48 w-48 opacity-5" />
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-4">Directory Statistics</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-serif text-white mb-2">{stats?.total || "..."}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Total Records</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-white mb-2">{stats?.teArawa || "..."}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Te Arawa</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-white mb-2">{stats?.buriedAtMuruika || "..."}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">At Muruika</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-primary mb-2">{stats?.verified || "..."}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathways / Services */}
      <section className="py-24 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Discover Pathways</h2>
            <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground">Engage with our initiatives, educational resources, and future journeys of remembrance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PathwayCard 
              icon={<Search className="h-6 w-6" />}
              title="Our People"
              desc="Search the roll call of Te Arawa and Ōhinemutu connected servicemen."
              href="/our-people"
            />
            <PathwayCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Education"
              desc="Resources for students and teachers, including school visits and materials."
              href="/education"
            />
            <PathwayCard 
              icon={<Mic className="h-6 w-6" />}
              title="Stories & Podcasts"
              desc="Listen to oral histories, read personal accounts, and explore visual essays."
              href="/stories"
            />
            <PathwayCard 
              icon={<MapPin className="h-6 w-6" />}
              title="Legacy Tours"
              desc="Join remembrance journeys tracing the footsteps of the Māori Battalion."
              href="/tours"
            />
            <PathwayCard 
              icon={<Compass className="h-6 w-6" />}
              title="Takrouna Carving"
              desc="Support the creation of a memorial carving destined for Tunisia."
              href="/takrouna"
            />
            <PathwayCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Share a Story"
              desc="Contribute family knowledge and photographs to our archives."
              href="/share-a-story"
            />
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      {featuredPeople && featuredPeople.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12 border-b border-border pb-6">
              <div>
                <h2 className="text-3xl font-serif mb-2">Featured Profiles</h2>
                <p className="text-muted-foreground">Highlighted stories from the directory.</p>
              </div>
              <Link href="/our-people" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
                View full directory <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredPeople.slice(0, 4).map(person => (
                <Link key={person.slug} href={`/our-people/${person.slug}`} className="group block">
                  <div className="aspect-[3/4] bg-muted mb-4 overflow-hidden relative">
                    {person.portraitUrl ? (
                      <img src={person.portraitUrl} alt={person.fullName} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground font-serif text-sm">No portrait</div>
                    )}
                    {person.sampleData && (
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">Demo</div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg group-hover:text-primary transition-colors">{person.fullName}</h3>
                  {person.unit && <p className="text-sm text-muted-foreground mt-1">{person.unit}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

function PathwayCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group block bg-card border border-border p-8 hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 bg-muted flex items-center justify-center text-foreground mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-serif mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{desc}</p>
      <div className="text-sm font-medium uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center">
        Explore <ArrowRight className="ml-2 h-3 w-3" />
      </div>
    </Link>
  );
}
