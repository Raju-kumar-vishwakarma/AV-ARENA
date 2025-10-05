import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { UserConfirmationEmail } from './_templates/user-confirmation.tsx';
import { AdminNotificationEmail } from './_templates/admin-notification.tsx';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();

    console.log("Processing contact form submission:", { name, email, subject });

    // Render user confirmation email
    const userEmailHtml = await renderAsync(
      React.createElement(UserConfirmationEmail, {
        name,
        email,
        subject,
        message,
      })
    );

    // Render admin notification email
    const adminEmailHtml = await renderAsync(
      React.createElement(AdminNotificationEmail, {
        name,
        email,
        phone,
        subject,
        message,
      })
    );

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "AV ARENA <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message - AV ARENA",
      html: userEmailHtml,
    });

    console.log("User confirmation email sent:", userEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "AV ARENA Contact Form <onboarding@resend.dev>",
      to: ["vishwajeetrathore2006@gmail.com"],
      subject: `New Contact: ${subject}`,
      html: adminEmailHtml,
      replyTo: email,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        userEmail: userEmailResponse,
        adminEmail: adminEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
