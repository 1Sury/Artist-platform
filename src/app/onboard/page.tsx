"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useApplications } from "@/contexts/ApplicationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const applicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  experience: z.string().min(1, "Experience is required"),
  availability: z.array(z.string()).min(1, "Select at least one availability option"),
  profileImage: z.instanceof(File).optional(),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const availabilityOptions = [
  { id: "weekends", label: "Weekends" },
  { id: "weekdays", label: "Weekdays" },
  { id: "evenings", label: "Evenings" },
];

export default function Onboard() {
  const router = useRouter();
  const { toast } = useToast();
  const { addApplication } = useApplications();
  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      location: "",
      bio: "",
      experience: "",
      availability: [],
      profileImage: undefined,
    },
  });

  const profileImage = form.watch("profileImage");

 const onSubmit = async (data: ApplicationForm) => {
  try {
    await addApplication({
      ...data,
      profileImage: data.profileImage ? URL.createObjectURL(data.profileImage) : "/placeholder.svg",
      city: data.location,
      fee: "0",
      languages: [],
    });
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted for review.",
    });
    router.push("/");
  } catch (_) { // Replace error with _
    toast({
      title: "Error",
      description: "Failed to submit application. Please try again.",
      variant: "destructive",
    });
  }
};
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Artistly
            </Link>
            <div className="flex space-x-4">
              <Link href="/artists" className="text-foreground hover:text-primary">
                Artists
              </Link>
              <Link href="/login?type=manager" className="text-foreground hover:text-primary">
                Manager Login
              </Link>
              
            <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-6">Join Artistly as a Performer</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="dance">Dance</SelectItem>
                      <SelectItem value="theater">Theater</SelectItem>
                      <SelectItem value="comedy">Comedy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your performance experience" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <div className="space-y-2">
                    {availabilityOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={(field.value || []).includes(option.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), option.id]
                              : (field.value || []).filter((value) => value !== option.id);
                            field.onChange(newValue);
                          }}
                        />
                        <label htmlFor={option.id} className="text-sm text-foreground">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Profile Image</FormLabel>
              <div className="mt-2">
                <label
                  htmlFor="profileImage"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  {profileImage ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">{profileImage.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Upload Profile Image</span>
                    </div>
                  )}
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      form.setValue("profileImage", file);
                    }}
                  />
                </label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
}