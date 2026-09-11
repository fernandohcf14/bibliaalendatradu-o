import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";

const PIXEL_ID = "938653842041574";

const eventSchema = z.object({
  eventName: z.enum(["PageView", "InitiateCheckout"]),
  eventId: z.string().min(1),
  eventSourceUrl: z.string().url(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
});

export const sendMetaEvent = createServerFn({ method: "POST" })
  .inputValidator((data) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    const accessToken = process.env["META_CAPI_ACCESS_TOKEN"];
    if (!accessToken) {
      return { ok: false as const, reason: "missing_token" };
    }

    const headers = getRequestHeaders();
    const userAgent = headers.get("user-agent") ?? undefined;
    const forwarded = headers.get("x-forwarded-for");
    const clientIp =
      forwarded?.split(",")[0]?.trim() ??
      headers.get("cf-connecting-ip") ??
      undefined;

    const userData: Record<string, string> = {};
    if (userAgent) userData["client_user_agent"] = userAgent;
    if (clientIp) userData["client_ip_address"] = clientIp;
    if (data.fbp) userData["fbp"] = data.fbp;
    if (data.fbc) userData["fbc"] = data.fbc;

    const payload = {
      data: [
        {
          event_name: data.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          action_source: "website",
          event_source_url: data.eventSourceUrl,
          user_data: userData,
        },
      ],
    };

    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        return { ok: false as const, reason: `meta_${res.status}` };
      }
      return { ok: true as const };
    } catch {
      return { ok: false as const, reason: "network_error" };
    }
  });
