import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Send, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                Get In
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions? We're here to help!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-primary/30 bg-card/50 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">support@avarena.com</p>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-card/50 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </CardContent>
              </Card>

              <Card className="border-primary/30 bg-card/50 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-primary/30 shadow-neon">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full shadow-neon"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </section>
    </div>
  );
};

export default Contact;
