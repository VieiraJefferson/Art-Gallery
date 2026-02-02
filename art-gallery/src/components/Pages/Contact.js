import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", "0fd0846e-c296-4390-a751-92058dde91f2");
    formDataToSend.append("name", `${formData.firstName} ${formData.lastName}`);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("message", formData.message);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formDataToSend)),
      }).then((res) => res.json());

      if (res.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for reaching out. We'll get back to you soon.",
          icon: "success",
          background: "#FAFAFA",
          color: "#0B090A",
          confirmButtonColor: "#E85D04",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#FAFAFA",
        color: "#0B090A",
        confirmButtonColor: "#E85D04",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display mb-6"
            >
              Get in <span className="text-accent-italic">Touch.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              We are available for questions, feedback, or collaboration
              opportunities. Let us know how we can help!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display mb-6">
                    Contact <span className="text-accent-italic">Information.</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Feel free to reach out through any of these channels.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  <motion.div
                    className="flex items-start gap-4 p-5 rounded-sm bg-card border border-border hover:border-accent/30 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-full bg-accent/10">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:maria.vantie@gmail.com"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        maria.vantie@gmail.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-5 rounded-sm bg-card border border-border hover:border-accent/30 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-full bg-accent/10">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        Location
                      </h3>
                      <p className="text-muted-foreground">
                        Based in Europe, Available Worldwide
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={onSubmit}
              className="p-8 rounded-sm bg-card border border-border"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-display mb-6">
                Send a <span className="text-accent-italic">Message.</span>
              </h2>

              <div className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-accent"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
