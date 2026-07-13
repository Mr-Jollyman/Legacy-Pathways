import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitSchoolEnquiry } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, GraduationCap, Map, Users } from "lucide-react";
import { SchoolEnquiryInputProgramme } from "@workspace/api-client-react";

const formSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  location: z.string().min(1, "Location is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  programme: z.nativeEnum(SchoolEnquiryInputProgramme),
  preferredDates: z.string().optional(),
  studentCount: z.coerce.number().optional(),
  studentAges: z.string().optional(),
  notes: z.string().optional(),
  website: z.string().optional() // Honeypot
});

export default function Education() {
  usePageMeta({
    title: "Education Hub",
    description: "Educational resources, school visits, and the Te Rau Aroha mobile experience."
  });

  const { toast } = useToast();
  const submitEnquiry = useSubmitSchoolEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "",
      location: "",
      contactName: "",
      email: "",
      phone: "",
      programme: "school_visit",
      preferredDates: "",
      studentCount: 0,
      studentAges: "",
      notes: "",
      website: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitEnquiry.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          toast({
            title: "Enquiry Submitted",
            description: data.message,
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error sending your enquiry. Please try again.",
          });
        }
      }
    );
  };

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Education Hub</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Teaching the Legacy</h1>
            <p className="text-lg text-muted/90 font-serif leading-relaxed">
              We provide authentic, verified resources for kaiako and ākonga to explore the histories of Māori servicemen, grounded in the stories of Te Arawa and Ōhinemutu.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-muted p-8 border border-border group hover:border-primary/30 transition-colors">
            <GraduationCap className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-2xl font-serif mb-3">Classroom Resources</h3>
            <p className="text-muted-foreground mb-6">
              Access digital books, school journals, and structured classroom activities aligned with the Aotearoa New Zealand histories curriculum.
            </p>
            <Button variant="outline">Browse Resources</Button>
          </div>
          
          <div className="bg-muted p-8 border border-border group hover:border-primary/30 transition-colors">
            <Users className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-2xl font-serif mb-3">Sgt. Haane Manahi Material</h3>
            <p className="text-muted-foreground mb-6">
              Educational materials exploring the extraordinary service of Sgt. Haane Manahi. <span className="italic block mt-2 text-xs">Note: Documentary screening rights are currently under review.</span>
            </p>
            <Button variant="outline">View Materials</Button>
          </div>
        </div>

        {/* Te Rau Aroha Mobile Experience */}
        <section className="mb-24 bg-card border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-serif mb-4">Te Rau Aroha Mobile Experience</h2>
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A proposed travelling education truck designed to bring the history of the 28th Māori Battalion directly to schools across Aotearoa.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The mobile exhibition will feature interactive displays, replica artifacts, and audio-visual stories, making this vital history accessible to ākonga who cannot travel to regional museums.
              </p>
              <div>
                <Button onClick={() => {
                  form.setValue('programme', 'te_rau_aroha');
                  document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                }}>Register School Interest</Button>
              </div>
            </div>
            <div className="bg-secondary min-h-[300px] flex items-center justify-center p-12 text-center border-t lg:border-t-0 lg:border-l border-border/20">
              <div>
                <Map className="h-16 w-16 text-muted/30 mx-auto mb-6" />
                <h3 className="text-xl font-serif text-white mb-2">Currently in Development</h3>
                <p className="text-muted text-sm max-w-sm mx-auto">Register your interest to be notified when the mobile experience begins its nationwide tour.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section id="enquiry-form" className="max-w-3xl mx-auto bg-muted/30 p-8 md:p-12 border border-border">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif mb-4">School Enquiry</h2>
            <p className="text-muted-foreground">Contact our education team to arrange a visit or request resources.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot */}
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
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name *</FormLabel>
                      <FormControl><Input placeholder="Enter school name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location / Region *</FormLabel>
                      <FormControl><Input placeholder="e.g. Rotorua" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person *</FormLabel>
                      <FormControl><Input placeholder="Teacher or admin name" {...field} /></FormControl>
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
                      <FormControl><Input type="email" placeholder="Email for correspondence" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="programme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Programme of Interest *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select programme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="school_visit">School Visit (In-person)</SelectItem>
                          <SelectItem value="te_rau_aroha">Te Rau Aroha Mobile Experience</SelectItem>
                          <SelectItem value="classroom_resources">Classroom Resources</SelectItem>
                          <SelectItem value="other">Other Enquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredDates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Term/Dates</FormLabel>
                      <FormControl><Input placeholder="e.g. Term 3, 2025" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="studentCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Number of Students</FormLabel>
                      <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentAges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Levels / Ages</FormLabel>
                      <FormControl><Input placeholder="e.g. Years 9-10" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes or Questions</FormLabel>
                    <FormControl><Textarea placeholder="Tell us about your learning objectives or specific requirements..." className="min-h-[120px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full h-12 text-base" disabled={submitEnquiry.isPending}>
                {submitEnquiry.isPending ? "Submitting..." : "Submit School Enquiry"}
              </Button>
            </form>
          </Form>
        </section>

      </div>
    </Layout>
  );
}
