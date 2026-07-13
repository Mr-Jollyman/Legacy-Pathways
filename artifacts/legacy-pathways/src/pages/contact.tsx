import { Layout } from "@/components/layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContactEnquiry } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional() // Honeypot
});

export default function Contact() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialSubject = searchParams.get('subject') || "";

  usePageMeta({
    title: "Contact",
    description: "Get in touch with the Legacy Pathways organisation."
  });

  const { toast } = useToast();
  const submitContact = useSubmitContactEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: initialSubject || "General Enquiry",
      message: "",
      website: ""
    }
  });

  useEffect(() => {
    if (initialSubject) {
      form.setValue('subject', initialSubject);
    }
  }, [initialSubject, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitContact.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          toast({
            title: "Message Sent",
            description: data.message,
          });
          form.reset({ subject: form.getValues('subject') });
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error sending your message. Please try again.",
          });
        }
      }
    );
  };

  return (
    <Layout>
      <div className="bg-secondary text-secondary-foreground py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Contact Us</h1>
          <p className="text-lg text-muted font-serif">
            We welcome enquiries, corrections, and feedback regarding the Legacy Pathways project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div className="md:col-span-1 space-y-8">
          <div>
            <h3 className="font-serif text-xl mb-2">Location</h3>
            <p className="text-muted-foreground text-sm">
              [Placeholder Address]<br />
              Ōhinemutu<br />
              Rotorua<br />
              Aotearoa New Zealand
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">
              kiaora@legacypathways.example.com
            </p>
          </div>
          <div className="bg-muted p-6 border border-border">
            <h3 className="font-serif text-lg mb-2">Reporting Corrections</h3>
            <p className="text-xs text-muted-foreground">
              If you have noticed an error in a profile, please use the form and select "Report a correction" as the subject. Our team verifies all corrections before updating the live directory.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
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
                      <FormLabel>Email *</FormLabel>
                      <FormControl><Input type="email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      {initialSubject && initialSubject.includes('Correction') ? (
                        <FormControl><Input {...field} readOnly className="bg-muted/50" /></FormControl>
                      ) : (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="General Enquiry">General Enquiry</SelectItem>
                            <SelectItem value="Report a correction">Report a correction</SelectItem>
                            <SelectItem value="Takrouna Carving Support">Takrouna Carving Support</SelectItem>
                            <SelectItem value="Media Enquiry">Media Enquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message *</FormLabel>
                    <FormControl><Textarea className="min-h-[150px]" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full sm:w-auto px-8 h-12 text-base" disabled={submitContact.isPending}>
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>

      </div>
    </Layout>
  );
}
