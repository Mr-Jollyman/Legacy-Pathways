import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitStoryContribution } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ShieldAlert } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  relationship: z.string().optional(),
  aboutPerson: z.string().optional(),
  story: z.string().min(10, "Please provide the story or information"),
  supportingDetails: z.string().optional(),
  publicUseConsent: z.boolean().default(false),
  preferredCredit: z.string().optional(),
  keepPrivate: z.boolean().default(false),
  website: z.string().optional() // Honeypot
});

export default function ShareAStory() {
  usePageMeta({
    title: "Share a Story",
    description: "Contribute family knowledge, stories, and photographs to the Legacy Pathways archive."
  });

  const { toast } = useToast();
  const submitContribution = useSubmitStoryContribution();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      relationship: "",
      aboutPerson: "",
      story: "",
      supportingDetails: "",
      publicUseConsent: false,
      preferredCredit: "",
      keepPrivate: false,
      website: ""
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitContribution.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          toast({
            title: "Contribution Received",
            description: data.message,
          });
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error sending your contribution. Please try again or email us directly.",
          });
        }
      }
    );
  };

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Share a Story</h1>
          <p className="text-lg text-muted max-w-2xl font-serif">
            Help us build a complete picture. Contribute family knowledge, photographs, or corrections to the archive.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-muted p-6 border border-border">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert className="h-6 w-6 text-primary shrink-0" />
              <h3 className="font-serif text-lg font-bold">Privacy & Moderation</h3>
            </div>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground block">Never published automatically</strong>
                All submissions go to a moderation queue and are reviewed by our historians and whānau representatives before being added to any public profile.
              </li>
              <li>
                <strong className="text-foreground block">Your privacy</strong>
                Your personal contact details (email, phone) will never be published. They are strictly used to contact you regarding your submission.
              </li>
              <li>
                <strong className="text-foreground block">Consent is paramount</strong>
                You can choose whether the information is for our private records only, or if it can be displayed publicly.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

              <div className="space-y-4">
                <h3 className="text-2xl font-serif border-b pb-2">Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
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
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship to Serviceman</FormLabel>
                        <FormControl><Input placeholder="e.g. Grandson, Researcher" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif border-b pb-2 mt-8">The Story</h3>
                <FormField
                  control={form.control}
                  name="aboutPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who is this about?</FormLabel>
                      <FormControl><Input placeholder="Name of the serviceman" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="story"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Story or Information *</FormLabel>
                      <FormControl><Textarea placeholder="Share the story, facts, or corrections here..." className="min-h-[200px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportingDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supporting Details (Sources, Dates, Places)</FormLabel>
                      <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 bg-muted/50 p-6 border border-border">
                <h3 className="text-lg font-serif mb-4">Permissions</h3>
                
                <FormField
                  control={form.control}
                  name="publicUseConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Consent for public display</FormLabel>
                        <FormDescription>
                          I agree that this information can be verified and added to the public profile on Legacy Pathways.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keepPrivate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Keep for internal records only</FormLabel>
                        <FormDescription>
                          I am providing this for archive purposes only. Do not publish this online.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredCredit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Credit (if published)</FormLabel>
                      <FormControl><Input placeholder="e.g. Provided by the Smith Whānau" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full h-12 text-base" disabled={submitContribution.isPending}>
                {submitContribution.isPending ? "Submitting..." : "Submit Contribution"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
