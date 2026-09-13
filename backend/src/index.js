/**
 * Cloudflare Worker Backend for White-Label AI Text + Voice Assistant
 * Powered by Google Gemini 3.6 Flash
 * 
 * Centralized Configuration:
 * All business details, catalog items, and branding are dynamically loaded from chatbot.config.json.
 * 
 * Endpoints:
 * - POST /chat: Real-time SSE streaming chat powered by Gemini 3.6 Flash.
 * - POST /get-token: Mints short-lived Gemini ephemeral token for client WebSockets.
 * - POST /book-appointment: Generates reference ID and Google Calendar scheduling link.
 * - GET /health: Health check and status.
 */

import botConfig from "../chatbot.config.json" with { type: "json" };

function generateSystemInstruction(config) {
  const b = config.business || {};
  const catalog = config.catalog || [];
  const faqs = config.faqs || [];

  const catalogText = catalog
    .map((item, idx) => {
      const feat = item.features ? item.features.join("; ") : "";
      return `${idx + 1}. ${item.title} (Key: ${item.key || item.id})
   - Details: ${feat}
   - Price: ${item.price || "Custom quote"}
   - Delivery / Turnaround: ${item.turnaround || "Flexible"}`;
    })
    .join("\n\n");

  const faqsText = faqs.map((f) => `- Q: ${f.question}\n  A: ${f.answer}`).join("\n");
  const validKeys = catalog.map((c) => `'${c.key || c.id}'`).join(", ");

  return `You are the virtual assistant for ${b.name || "our company"}.

Master Instructions for Conversational & Spoken Flow:
- Extreme Brevity & Directness: Answer to the point, concise, and conversational. Keep responses strictly between 1 to 3 natural sentences (max 35-45 words).
- Never Recite Long Exhaustive Lists: When asked about services or products, give a concise 1-sentence summary of our main areas and invite the user to choose what interests them, rather than reading the entire catalog.
- Spoken Conversational Tone: The visitor is listening to you speaking live. Never output markdown headers, dense bullet points, or repetitive greetings. Speak naturally as a calm, hospitable human consultant.
- Demeanor: Always maintain an exceptionally calm, polite, courteous, and soothing tone with genuine warmth and reassurance.

About us: ${b.description || ""}
Location & Operating Hours: ${b.address || "Remote"}, Operating hours: ${b.operatingHours || "Monday to Friday"}.

Products & Services we offer:
${catalogText}

Frequently Asked Questions:
${faqsText}

Tool Calling Instructions:
- When a user asks to see a product, service, visual sample, deliverable, or catalog item, call the show_media tool with item_name set to the product key or title (recognized keys: ${validKeys}).
- When a user asks for human contact, requests to talk on WhatsApp, or needs direct escalation, call the transfer_to_whatsapp tool.
- When a user wants to book an appointment, schedule a consultation, or reserve a slot, call the book_appointment tool with service_name, date, time, and client details.
- Provide polite, calm conversational explanations alongside tool calls.`;
}

function generateAssistantTools(config) {
  const b = config.business || {};
  const catalog = config.catalog || [];

  return [
    {
      functionDeclarations: [
        {
          name: "show_media",
          description: `Displays a visual card with product or service details when a user asks about ${b.name || "our"} offerings.`,
          parameters: {
            type: "OBJECT",
            properties: {
              item_name: {
                type: "STRING",
                description: `The product or service identifier or name from the catalog.`,
              },
            },
            required: ["item_name"],
          },
        },
        {
          name: "transfer_to_whatsapp",
          description: `Transfers the user to a human team member or advisor on WhatsApp when requested or for direct consultation.`,
          parameters: {
            type: "OBJECT",
            properties: {
              reason: {
                type: "STRING",
                description: "Short summary of the user's inquiry or reason for connecting.",
              },
            },
            required: ["reason"],
          },
        },
        {
          name: "book_appointment",
          description: `Schedules a consultation or service appointment for ${b.name || "the business"}. Call this when the user asks to book an appointment, schedule a consultation, or confirms their preferred date and time.`,
          parameters: {
            type: "OBJECT",
            properties: {
              service_name: {
                type: "STRING",
                description: `The service or product name (e.g. ${catalog[0]?.title || "Consultation"}).`,
              },
              date: {
                type: "STRING",
                description: "Appointment date (e.g. '2026-09-25' or 'Friday').",
              },
              time: {
                type: "STRING",
                description: "Preferred time slot (e.g. '14:00' or '2:00 PM').",
              },
              client_name: {
                type: "STRING",
                description: "Name of the client or organization.",
              },
              client_email: {
                type: "STRING",
                description: "Client contact email for booking confirmation.",
              },
              notes: {
                type: "STRING",
                description: "Brief scope, requirements, or questions.",
              },
            },
            required: ["service_name", "date", "time"],
          },
        },
      ],
    },
  ];
}

const SYSTEM_INSTRUCTION = generateSystemInstruction(botConfig);
const ASSISTANT_TOOLS = generateAssistantTools(botConfig);

function resolveAllowedOrigin(requestOrigin, allowedOriginSetting = "*") {
  if (!allowedOriginSetting || allowedOriginSetting === "*") {
    return requestOrigin || "*";
  }
  const allowedList = allowedOriginSetting.split(",").map((s) => s.trim().toLowerCase());
  if (requestOrigin && allowedList.includes(requestOrigin.toLowerCase())) {
    return requestOrigin;
  }
  return allowedList[0] || "*";
}

function getCorsHeaders(requestOrigin, allowedOriginSetting = "*") {
  const originToAllow = resolveAllowedOrigin(requestOrigin, allowedOriginSetting);
  return {
    "Access-Control-Allow-Origin": originToAllow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-goog-api-key",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(data, status = 200, origin = "*", allowedOrigin = "*") {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin, allowedOrigin),
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "*";
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";
    const url = new URL(request.url);

    // Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(origin, allowedOrigin),
      });
    }

    try {
      // Health check endpoint
      if (url.pathname === "/" || url.pathname === "/health") {
        return jsonResponse(
          {
            status: "online",
            service: `${botConfig.business?.name || "AI"} Assistant Backend`,
            version: "1.0.0",
            model: env.CHAT_MODEL || env.LIVE_MODEL || "gemini-flash-lite-latest",
            timestamp: new Date().toISOString(),
          },
          200,
          origin,
          allowedOrigin
        );
      }

      // 1. Streaming Text Chat endpoint
      if (url.pathname === "/chat" && request.method === "POST") {
        if (!env.GEMINI_API_KEY) {
          return jsonResponse(
            {
              error: "GEMINI_API_KEY secret is not set in Worker environment.",
              hint: "Set GEMINI_API_KEY in your Cloudflare Worker secrets or local .dev.vars file.",
            },
            500,
            origin
          );
        }

        let body;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ error: "Invalid JSON body" }, 400, origin);
        }

        const { message, history = [], isVoice = false } = body;
        if (!message || typeof message !== "string") {
          return jsonResponse({ error: "Field 'message' is required and must be a string." }, 400, origin);
        }

        // Dynamic System Instruction with live voice mode enhancement
        let dynamicInstruction = SYSTEM_INSTRUCTION;
        if (isVoice) {
          dynamicInstruction += `\n\nCRITICAL LIVE AUDIO DIRECTIVE: The user is currently speaking live with you over audio. You MUST reply in only 1 to 2 brief, natural, conversational sentences (maximum 30 words). Answer their immediate question directly and ask a brief follow-up. Absolutely no bullet points or long explanations.`;
        }

        // Format conversation history for Gemini API
        const formattedContents = [];
        for (const item of history) {
          if (item.role && item.text) {
            formattedContents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.text }],
            });
          }
        }
        // Add current user message
        formattedContents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const geminiPayload = {
          contents: formattedContents,
          tools: ASSISTANT_TOOLS,
          systemInstruction: {
            parts: [{ text: dynamicInstruction }],
          },
        };

        const candidateModels = Array.from(
          new Set([
            env.CHAT_MODEL,
            env.LIVE_MODEL,
            "gemini-flash-lite-latest",
            "gemini-3.1-flash-lite",
            "gemini-flash-latest",
            "gemini-3.6-flash",
          ].filter(Boolean))
        );

        let googleResponse = null;
        let lastErrorText = "";
        let lastStatus = 500;

        for (const candidate of candidateModels) {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${candidate}:streamGenerateContent?alt=sse&key=${env.GEMINI_API_KEY}`;

          try {
            const resp = await fetch(geminiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(geminiPayload),
            });

            if (resp.ok) {
              googleResponse = resp;
              break;
            }

            const errText = await resp.text();
            lastStatus = resp.status;
            lastErrorText = errText;
            console.warn(`[Gemini Model Fallback] Model ${candidate} returned HTTP ${resp.status}:`, errText);

            // If quota exhausted (429), model not found/deprecated (404), or service busy (503), try next model
            if (resp.status === 429 || resp.status === 404 || resp.status === 503) {
              continue;
            } else {
              break;
            }
          } catch (fetchErr) {
            console.warn(`[Gemini Model Fallback] Network error on ${candidate}:`, fetchErr.message);
          }
        }

        if (!googleResponse) {
          console.error("All candidate Gemini models failed. Last error:", lastStatus, lastErrorText);
          let friendlyMessage = "Google Gemini API rejected request.";
          if (lastStatus === 429) {
            friendlyMessage = "Google Gemini API quota limit reached. Please check your project billing/tier or try again in a minute.";
          }
          return jsonResponse(
            {
              error: friendlyMessage,
              status: lastStatus,
              details: lastErrorText,
            },
            lastStatus,
            origin,
            allowedOrigin
          );
        }

        // Return SSE stream directly to client
        return new Response(googleResponse.body, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            ...getCorsHeaders(origin, allowedOrigin),
          },
        });
      }

      // 2. Mint Ephemeral Token endpoint (For WebSocket Live API)
      if (url.pathname === "/get-token" && request.method === "POST") {
        if (!env.GEMINI_API_KEY) {
          return jsonResponse(
            {
              error: "GEMINI_API_KEY secret is not set in Worker environment.",
              hint: "Set GEMINI_API_KEY in your Cloudflare Worker secrets or local .dev.vars file.",
            },
            500,
            origin
          );
        }

        const now = Date.now();
        const expireTime = new Date(now + 30 * 60 * 1000).toISOString();
        const newSessionExpireTime = new Date(now + 2 * 60 * 1000).toISOString();

        const tokenRequestPayload = {
          uses: 1,
          expireTime: expireTime,
          newSessionExpireTime: newSessionExpireTime,
        };

        const googleResponse = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/auth_tokens",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": env.GEMINI_API_KEY,
            },
            body: JSON.stringify(tokenRequestPayload),
          }
        );

        if (!googleResponse.ok) {
          const errorDetails = await googleResponse.text();
          console.error("Gemini Auth Token Error:", googleResponse.status, errorDetails);
          return jsonResponse(
            {
              error: "Google Gemini API rejected token minting request.",
              status: googleResponse.status,
              details: errorDetails,
            },
            502,
            origin
          );
        }

        const tokenData = await googleResponse.json();
        const tokenName = tokenData.name || tokenData.token || "";

        return jsonResponse(
          {
            token: tokenName,
            name: tokenName,
            expireTime: tokenData.expireTime || expireTime,
            newSessionExpireTime: tokenData.newSessionExpireTime || newSessionExpireTime,
            model: env.CHAT_MODEL || env.LIVE_MODEL || "gemini-flash-lite-latest",
          },
          200,
          origin,
          allowedOrigin
        );
      }

      // 3. Book Appointment endpoint (Google Calendar integration)
      if (url.pathname === "/book-appointment" && request.method === "POST") {
        let body;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ error: "Invalid JSON body" }, 400, origin);
        }

        const {
          service_name = botConfig.catalog?.[0]?.title || "Consultation",
          date = new Date(Date.now() + 86400000).toISOString().split("T")[0],
          time = "14:00",
          client_name = "Valued Client",
          client_email = "",
          notes = "",
        } = body;

        const companyPrefix = (botConfig.business?.name || "BOT")
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "")
          .slice(0, 4);
        const bookingId = `${companyPrefix}-APP-${Math.floor(10000 + Math.random() * 90000)}`;

        // Build Google Calendar "Add to Calendar" Template URL
        const title = encodeURIComponent(`${botConfig.business?.name || "Consultation"} - ${service_name} Appointment`);
        const details = encodeURIComponent(
          `Booking Reference: ${bookingId}\n` +
          `Service: ${service_name}\n` +
          `Client: ${client_name}${client_email ? " (" + client_email + ")" : ""}\n` +
          `Notes: ${notes || "Consultation session"}\n` +
          `Platform: Remote Digital Meeting (Google Meet)\n` +
          `Company: ${botConfig.business?.name || "Customer Service"}`
        );
        const location = encodeURIComponent("Google Meet (Video Consultation)");

        // Calculate ISO date strings for the calendar invite
        const now = new Date();
        const startStr = now.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
        const endStr = new Date(now.getTime() + 30 * 60000).toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startStr}/${endStr}`;

        return jsonResponse(
          {
            status: "confirmed",
            bookingId,
            service_name,
            date,
            time,
            client_name,
            client_email,
            notes,
            calendarUrl,
            message: `Your appointment for ${service_name} has been confirmed.`,
          },
          200,
          origin
        );
      }

      // Route not found
      return jsonResponse({ error: "Not Found", path: url.pathname }, 404, origin);
    } catch (err) {
      console.error("Unhandled Worker Error:", err);
      return jsonResponse(
        {
          error: "Internal Server Error",
          message: err.message,
        },
        500,
        origin
      );
    }
  },
};
