import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useListTours, useSubmitTourEnquiry } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toursBg from "../assets/tours-bg.png";
import { MapPin, Calendar, CreditCard } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  preferredTour: z.string().min(1, "Please select a tour"),
  travellers: z.coerce.number().min(1).default(1),
  ageRange: z.string().optional(),
  connectionToServiceman: z.string().optional(),
  accessibilityNeeds: z.string().optional(),
  roomArrangement: z.string().optional(),
  questions: z.string().optional(),
  receiveUpdates: z.boolean().default(false),
  website: z.string().optional() // Honeypot
});

export default function Tours() {
  usePageMeta({
    title: "Legacy Tours",
    description: "Remembrance journeys tracing the footsteps of the Māori Battalion."
  });

  const { data: tours, isLoading } = useListTours();
  const { toast } = useToast();
  const submitEnquiry = useSubmitTourEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredTour: "",
      travellers: 1,
      ageRange: "",
      connectionToServiceman: "",
      accessibilityNeeds: "",
      roomArrangement: "",
      questions: "",
      receiveUpdates: true,
      website: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitEnquiry.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          toast({
            title: "Registration Received",
            description: data.message,
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error sending your registration. Please try again.",
          });
        }
      }
    );
  };

  return (
    <Layout>
      <section className="relative w-full h-[60vh] flex items-center bg-black">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={toursBg} 
            alt="Italian war cemetery landscape" 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-6 drop-shadow-lg">
            Legacy Tours
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-serif drop-shadow-md">
            Walking in the footsteps of our ancestors. Remembrance journeys to Gallipoli, Italy, and Tunisia.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            All itineraries presented below are proposed and subject to final confirmation. We are currently registering interest from whānau who wish to undertake these significant haerenga (journeys) of remembrance.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            {[1,2].map(i => (
              <div key={i} className="animate-pulse h-64 bg-muted border border-border"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-12 max-w-4xl mx-auto mb-24">
            {tours?.map((tour) => (
              <div key={tour.slug} className="bg-card border border-border flex flex-col md:flex-row overflow-hidden relative">
                {tour.sampleData && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] px-3 py-1 uppercase tracking-wider z-10">
                    Proposed Itinerary
                  </div>
                )}
                <div className="w-full md:w-1/3 bg-muted border-b md:border-b-0 md:border-r border-border p-6 flex flex-col justify-center items-center text-center">
                  <h3 className="text-2xl font-serif mb-2">{tour.name}</h3>
                  <div className="text-sm font-medium uppercase tracking-widest text-primary mb-4">{tour.category}</div>
                  <div className="inline-block px-3 py-1 bg-secondary/10 border text-xs uppercase font-medium">
                    {tour.status.replace('_', ' ')}
                  </div>
                </div>
                <div className="w-full md:w-2/3 p-6 md:p-8">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{tour.summary}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {tour.durationDays && (
                      <div className="flex items-center text-sm text-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {tour.durationDays} Days
                      </div>
                    )}
                    {tour.estimatedPrice && (
                      <div className="flex items-center text-sm text-foreground">
                        <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                        {tour.estimatedPrice} <span className="text-muted-foreground ml-1">(Est.)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="text-sm text-foreground leading-relaxed">
                      <strong>Key Destinations:</strong> {tour.destinations.join(" • ")}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button 
                      onClick={() => {
                        form.setValue('preferredTour', tour.slug);
                        document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      variant="outline"
                    >
                      Register Interest
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Registration Form */}
        <section id="register-form" className="max-w-3xl mx-auto bg-muted/30 p-8 md:p-12 border border-border">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif mb-4">Register Interest</h2>
            <p className="text-muted-foreground">Register your interest to receive detailed itineraries and confirmed pricing as they become available.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="hidden">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredTour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour of Interest *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tour" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tours?.map(t => (
                            <SelectItem key={t.slug} value={t.slug}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="travellers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Travellers *</FormLabel>
                      <FormControl><Input type="number" min="1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ageRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>General Age Range of Group</FormLabel>
                      <FormControl><Input placeholder="e.g. 50s-70s" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="connectionToServiceman"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Connection to Serviceman (Optional)</FormLabel>
                    <FormControl><Input placeholder="Are you travelling to visit a specific grave or battlefield?" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="accessibilityNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accessibility Requirements</FormLabel>
                      <FormControl><Input placeholder="Mobility needs, dietary, etc." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomArrangement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single Room</SelectItem>
                          <SelectItem value="twin">Twin Share</SelectItem>
                          <SelectItem value="double">Double</SelectItem>
                          <SelectItem value="undecided">Undecided</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions or Comments</FormLabel>
                    <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-12 text-base" disabled={submitEnquiry.isPending}>
                {submitEnquiry.isPending ? "Registering..." : "Register Interest"}
              </Button>
            </form>
          </Form>
        </section>

      </div>
    </Layout>
  );
}
