import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useParams, Link } from "wouter";
import { useGetPerson, getGetPersonQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, BookOpen, AlertCircle, Share2, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import portraitPlaceholder from "../assets/portrait-placeholder.png";

export default function PersonProfile() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: person, isLoading, error } = useGetPerson(slug, {
    query: { enabled: !!slug, queryKey: getGetPersonQueryKey(slug) }
  });

  usePageMeta({
    title: person ? person.fullName : "Profile",
    description: person?.shortBio || "Service profile"
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4 max-w-md w-full">
            <div className="h-64 bg-muted w-full"></div>
            <div className="h-8 bg-muted w-3/4"></div>
            <div className="h-4 bg-muted w-1/2"></div>
            <div className="h-4 bg-muted w-full"></div>
            <div className="h-4 bg-muted w-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !person) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-serif mb-2">Profile not found</h1>
          <p className="text-muted-foreground mb-6">The profile you are looking for does not exist or has been removed.</p>
          <Link href="/our-people">
            <Button variant="outline">Return to directory</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${person.fullName} - Legacy Pathways`,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Would ideally show a toast here
    }
  };

  return (
    <Layout>
      {/* Verification Banner */}
      {person.sampleData && (
        <div className="bg-orange-100 text-orange-900 px-4 py-2 text-center text-sm font-medium">
          Demonstration Only — This is a placeholder profile with sample data.
        </div>
      )}
      
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/our-people" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roll Call
          </Link>
          <div className="flex gap-2">
            {person.verificationStatus === 'verified' && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 uppercase tracking-wider">Verified</span>
            )}
            {person.verificationStatus === 'awaiting_whanau_review' && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 uppercase tracking-wider">Awaiting Whānau Review</span>
            )}
            {person.verificationStatus === 'draft' && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-200 text-gray-800 uppercase tracking-wider">Draft</span>
            )}
            <button onClick={handleShare} className="text-muted-foreground hover:text-foreground ml-2" aria-label="Share profile">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sidebar: Portrait & Quick Facts */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="aspect-[3/4] bg-muted relative">
              <img 
                src={person.portraitUrl || portraitPlaceholder} 
                alt={person.fullName} 
                className="w-full h-full object-cover grayscale" 
              />
            </div>

            <div className="bg-secondary/5 border border-border p-6 space-y-4">
              <h3 className="font-serif text-lg border-b pb-2">Service Details</h3>
              
              {person.serviceNumber && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Service Number</div>
                  <div className="font-medium">{person.serviceNumber}</div>
                </div>
              )}
              {person.rank && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Rank</div>
                  <div className="font-medium">{person.rank}</div>
                </div>
              )}
              {person.unit && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Unit</div>
                  <div className="font-medium">{person.unit}</div>
                </div>
              )}
              {person.company && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Company</div>
                  <div className="font-medium">{person.company}</div>
                </div>
              )}
              {person.war && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Conflict</div>
                  <div className="font-medium">{person.war}</div>
                </div>
              )}
            </div>

            <div className="bg-secondary/5 border border-border p-6 space-y-4">
              <h3 className="font-serif text-lg border-b pb-2">Personal Details</h3>
              
              {(person.iwi || person.hapu) && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Iwi / Hapū</div>
                  <div className="font-medium">{person.iwi}{person.iwi && person.hapu && ' / '}{person.hapu}</div>
                </div>
              )}
              {person.birthplace && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Birthplace</div>
                  <div className="font-medium">{person.birthplace}</div>
                </div>
              )}
              {person.dateOfBirth && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date of Birth</div>
                  <div className="font-medium">{person.dateOfBirth}</div>
                </div>
              )}
              {person.dateOfDeath && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date of Death</div>
                  <div className="font-medium">{person.dateOfDeath}</div>
                </div>
              )}
              {(person.buriedAtMuruika || person.graveReference) && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Resting Place</div>
                  <div className="font-medium">
                    {person.buriedAtMuruika ? "Muruika Urupā, Ōhinemutu" : person.graveReference}
                  </div>
                </div>
              )}
            </div>

          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            <header>
              <h1 className="text-5xl lg:text-6xl font-serif mb-4 leading-tight">{person.fullName}</h1>
              {person.alternativeNames.length > 0 && (
                <p className="text-lg text-muted-foreground italic mb-6">Also known as: {person.alternativeNames.join(', ')}</p>
              )}
              {person.shortBio && (
                <p className="text-xl font-serif leading-relaxed text-foreground border-l-4 border-primary pl-6 py-2 my-8">
                  {person.shortBio}
                </p>
              )}
            </header>

            {person.fullStory && (
              <section>
                <h2 className="text-3xl font-serif mb-6 flex items-center"><BookOpen className="mr-3 h-6 w-6 text-primary" /> Story</h2>
                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none font-serif leading-relaxed">
                  {person.fullStory.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            )}

            {person.timeline && person.timeline.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif mb-8">Timeline</h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  {person.timeline.map((event, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-secondary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="text-xs font-semibold">{event.year}</span>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-muted/50 border border-border">
                        <p className="text-sm text-foreground">{event.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(person.campaigns.length > 0 || person.honours.length > 0) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {person.campaigns.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-serif mb-6 border-b pb-2">Campaigns</h2>
                    <ul className="space-y-3">
                      {person.campaigns.map((camp, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                          <span className="text-foreground">{camp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {person.honours.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-serif mb-6 border-b pb-2">Honours & Awards</h2>
                    <ul className="space-y-3">
                      {person.honours.map((honour, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 shrink-0"></span>
                          <span className="text-foreground">{honour}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {person.galleryUrls.length > 0 && (
              <section>
                <h2 className="text-3xl font-serif mb-6">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {person.galleryUrls.map((url, i) => (
                    <div key={i} className="aspect-square bg-muted">
                      <img src={url} alt={`Gallery image ${i+1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sources & Contribution CTAs */}
            <section className="bg-secondary/5 border border-border p-8 mt-16">
              <div className="flex items-center gap-3 mb-6">
                <Info className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-serif">Sources & Acknowledgements</h2>
              </div>
              
              {person.sources.length > 0 && (
                <div className="mb-8">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {person.sources.map((source, i) => (
                      <li key={i}>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline decoration-border underline-offset-4">
                            {source.name} {source.organisation && `(${source.organisation})`}
                          </a>
                        ) : (
                          <span>{source.name} {source.organisation && `(${source.organisation})`}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t pt-8">
                <h3 className="font-serif text-lg mb-4 text-foreground">Additional information welcomed</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
                  Legacy Pathways relies on whānau and researchers to help build a complete picture of these servicemen. If you have photographs, stories, or corrections for this profile, please share them with us.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/share-a-story">
                    <Button variant="default"><MessageSquare className="mr-2 h-4 w-4" /> Share a Story or Photo</Button>
                  </Link>
                  <Link href={`/contact?subject=Correction for ${person.fullName}`}>
                    <Button variant="outline">Report a Correction</Button>
                  </Link>
                </div>
              </div>
              
              {person.lastReviewed && (
                <div className="mt-8 text-xs text-muted-foreground pt-4 border-t border-border/50">
                  Last reviewed: {person.lastReviewed}
                </div>
              )}
            </section>

          </div>
        </div>
      </article>
    </Layout>
  );
}
