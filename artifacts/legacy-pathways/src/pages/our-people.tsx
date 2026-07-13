import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useListPeople, getListPeopleQueryKey, ListPeopleSort } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import portraitPlaceholder from "../assets/portrait-placeholder.png";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function OurPeople() {
  usePageMeta({
    title: "Our People",
    description: "Search the roll call of Te Arawa and Ōhinemutu connected servicemen."
  });

  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState<string | undefined>();
  const [war, setWar] = useState<string | undefined>();
  const [teArawa, setTeArawa] = useState(false);
  const [ohinemutu, setOhinemutu] = useState(false);
  const [buriedAtMuruika, setBuriedAtMuruika] = useState(false);
  const [sort, setSort] = useState<ListPeopleSort>("surname");
  const [page, setPage] = useState(1);
  const pageSize = 24;

  const { data: peoplePage, isLoading } = useListPeople({
    search: search || undefined,
    letter,
    war,
    teArawa: teArawa || undefined,
    ohinemutu: ohinemutu || undefined,
    buriedAtMuruika: buriedAtMuruika || undefined,
    sort,
    page,
    pageSize
  });

  const clearFilters = () => {
    setSearch("");
    setLetter(undefined);
    setWar(undefined);
    setTeArawa(false);
    setOhinemutu(false);
    setBuriedAtMuruika(false);
    setSort("surname");
    setPage(1);
  };

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Our People</h1>
          <p className="text-lg text-muted max-w-2xl font-serif">
            Roll Call. Explore the directory of servicemen connected to Ōhinemutu, Te Arawa, and Muruika Urupā.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4 border-b pb-2">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Name or service number" 
                className="pl-9"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4 border-b pb-2">Browse A-Z</h3>
            <div className="flex flex-wrap gap-1">
              {ALPHABET.map(l => (
                <button
                  key={l}
                  onClick={() => { setLetter(letter === l ? undefined : l); setPage(1); }}
                  className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${letter === l ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4 border-b pb-2">Filters</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground block">Conflict</label>
                <Select value={war || "all"} onValueChange={(v) => { setWar(v === "all" ? undefined : v); setPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="All conflicts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All conflicts</SelectItem>
                    <SelectItem value="WW1">World War I</SelectItem>
                    <SelectItem value="WW2">World War II</SelectItem>
                    <SelectItem value="Vietnam">Vietnam War</SelectItem>
                    <SelectItem value="Korea">Korean War</SelectItem>
                    <SelectItem value="Malaya">Malayan Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="teArawa" checked={teArawa} onCheckedChange={(c) => { setTeArawa(!!c); setPage(1); }} />
                <label htmlFor="teArawa" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Te Arawa
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ohinemutu" checked={ohinemutu} onCheckedChange={(c) => { setOhinemutu(!!c); setPage(1); }} />
                <label htmlFor="ohinemutu" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ōhinemutu Connection
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="buriedAtMuruika" checked={buriedAtMuruika} onCheckedChange={(c) => { setBuriedAtMuruika(!!c); setPage(1); }} />
                <label htmlFor="buriedAtMuruika" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Buried at Muruika Urupā
                </label>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <p className="text-sm text-muted-foreground">
              {isLoading ? "Loading..." : `Showing ${peoplePage?.total || 0} results`}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
              <Select value={sort} onValueChange={(v: ListPeopleSort) => { setSort(v); setPage(1); }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surname">Surname</SelectItem>
                  <SelectItem value="givenName">Given Name</SelectItem>
                  <SelectItem value="serviceNumber">Service Number</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col bg-muted/30 aspect-[3/4]"></div>
              ))}
            </div>
          ) : peoplePage?.items.length === 0 ? (
            <div className="text-center py-24 bg-muted/20 border border-dashed">
              <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-serif mb-2">No servicemen found</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                Try adjusting your search criteria or clearing filters to see more results.
              </p>
              <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {peoplePage?.items.map(person => (
                  <Link key={person.slug} href={`/our-people/${person.slug}`} className="group flex flex-col bg-card border hover:border-primary/50 transition-colors">
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                      <img 
                        src={person.portraitUrl || portraitPlaceholder} 
                        alt={person.fullName} 
                        className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" 
                      />
                      {person.sampleData && (
                        <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 uppercase tracking-wider">Demo Profile</div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="text-xs text-muted-foreground mb-1 font-medium">{person.serviceNumber || "Service No. Unknown"}</div>
                      <h3 className="font-serif text-lg leading-tight mb-2 group-hover:text-primary transition-colors">{person.fullName}</h3>
                      <div className="text-sm text-muted-foreground mb-4">
                        {person.rank && <span className="block">{person.rank}</span>}
                        {person.unit && <span className="block">{person.unit}</span>}
                      </div>
                      <div className="mt-auto pt-4 border-t border-border flex flex-wrap gap-2">
                        {person.buriedAtMuruika && (
                          <span className="text-[10px] bg-muted px-2 py-1 uppercase tracking-wider">Muruika Urupā</span>
                        )}
                        {person.teArawa && (
                          <span className="text-[10px] bg-muted px-2 py-1 uppercase tracking-wider">Te Arawa</span>
                        )}
                        {person.verificationStatus === 'verified' && (
                          <span className="text-[10px] bg-green-100 text-green-800 px-2 py-1 uppercase tracking-wider">Verified</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {peoplePage && peoplePage.totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <Button 
                    variant="outline" 
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center px-4 text-sm font-medium">
                    Page {page} of {peoplePage.totalPages}
                  </div>
                  <Button 
                    variant="outline" 
                    disabled={page === peoplePage.totalPages}
                    onClick={() => setPage(p => Math.min(peoplePage.totalPages, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
