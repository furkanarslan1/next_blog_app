"use client";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid e-mail adress",
  }),
  message: z.string().min(10, {
    message: "Message must be at leats 10 characters",
  }),
  recaptcha: z.string().min(1, {
    message: "Please verify that you are not a robot",
  }),
});
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values }),
    });

    if (res.ok) return confirm("Sent E-mail");
  } catch (err) {
    console.log("Error ", err);
  }
  console.log(values);
}

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Furkan",
      email: "example@example",
      message: "Hello There!",
      recaptcha: "",
    },
  });

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>();

  return (
    <div className=" lg:w-4xl text-2xl">
      <h1 className="text-2xl md:text-4xl  font-bold mb-12 pb-2 border-b-2">
        Contact Us
      </h1>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-2xl">Name</FormLabel>
                <FormControl>
                  <Input
                    className="lg:text-2xl"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-2xl">E-mail</FormLabel>
                <FormControl>
                  <Input
                    className="lg:text-2xl"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-2xl">Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="lg:text-lg"
                    placeholder="Enter a message"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <ReCAPTCHA
            sitekey="6Lf3P30rAAAAAMJn8XC16BDai-3i26xjhEKqNpqR"
            onChange={(token: string | null) => {
              setRecaptchaToken(token);
              form.setValue("recaptcha", token || "");
            }}
          />

          <Button
            className="cursor-pointer bg-white text-black hover:bg-black hover:text-white transition-all duration-300 border-1 hover:border-white font-bold w-full   md:p-6 md:text-2xl  "
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
