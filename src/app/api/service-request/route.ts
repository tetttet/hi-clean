import { NextResponse } from "next/server";

type ServiceRequestPayload = {
  service: string;
  package: string;
  packageDetail: string;
  estimate: string;
  location: string;
  schedule: string;
  home: {
    rooms: string;
    bathrooms: string;
    squareMeters: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
  };
  speed: string;
  payment: string;
  frequency: string;
  addOns: string[];
  note: string;
  priceLines: { label: string; value: string }[];
};

type TelegramResponse = {
  ok: boolean;
  description?: string;
};

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_GROUP_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram credentials are not configured." },
      { status: 500 }
    );
  }

  let payload: ServiceRequestPayload;

  try {
    payload = (await request.json()) as ServiceRequestPayload;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const validationError = validatePayload(payload);

  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const message = buildTelegramMessage(payload);
  let telegramResponse: Response;

  try {
    telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          disable_web_page_preview: true,
        }),
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Telegram is unreachable right now." },
      { status: 502 }
    );
  }

  const telegramResult = await parseTelegramResponse(telegramResponse);

  if (!telegramResponse.ok || !telegramResult.ok) {
    return NextResponse.json(
      {
        error:
          telegramResult.description ??
          "Telegram could not receive the request.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function validatePayload(payload: ServiceRequestPayload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request payload.";
  }

  if (!hasText(payload.service)) return "Service is required.";
  if (!hasText(payload.package)) return "Package is required.";
  if (!hasText(payload.location)) return "Location is required.";
  if (!hasText(payload.schedule)) return "Schedule is required.";
  if (!hasText(payload.contact?.firstName)) return "First name is required.";
  if (!hasText(payload.contact?.lastName)) return "Last name is required.";
  if (!hasText(payload.contact?.phone)) return "Phone is required.";
  if (!hasText(payload.contact?.address)) return "Address is required.";

  return null;
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function buildTelegramMessage(payload: ServiceRequestPayload) {
  const contactName = `${clean(payload.contact.firstName)} ${clean(
    payload.contact.lastName
  )}`.trim();
  const addOnsList = Array.isArray(payload.addOns) ? payload.addOns : [];
  const priceLinesList = Array.isArray(payload.priceLines)
    ? payload.priceLines
    : [];
  const addOns =
    addOnsList.length > 0
      ? addOnsList.map((item) => clean(item)).join(", ")
      : "None";
  const squareMeters = clean(payload.home?.squareMeters, "Not specified");
  const email = clean(payload.contact.email, "Not provided");
  const note = clean(payload.note, "No note");
  const priceLines =
    priceLinesList.length > 0
      ? priceLinesList
          .map((line) => `- ${clean(line.label)}: ${clean(line.value)}`)
          .join("\n")
      : "- No breakdown";

  return trimTelegramMessage(`New HI-Clean request

Contact
Name: ${contactName}
Phone: ${clean(payload.contact.phone)}
Email: ${email}
Address: ${clean(payload.contact.address)}

Service
Service: ${clean(payload.service)}
Package: ${clean(payload.package)}
Package detail: ${clean(payload.packageDetail)}
Estimate: ${clean(payload.estimate)}
Speed: ${clean(payload.speed)}
Payment: ${clean(payload.payment)}
Frequency: ${clean(payload.frequency)}

Location and time
Location: ${clean(payload.location)}
Schedule: ${clean(payload.schedule)}
Rooms: ${clean(payload.home?.rooms)}
Bathrooms: ${clean(payload.home?.bathrooms)}
Square meters: ${squareMeters}

Extras
${addOns}

Note
${note}

Price breakdown
${priceLines}`);
}

function clean(value: unknown, fallback = "-") {
  if (typeof value !== "string") return fallback;

  const cleaned = value.replace(/\s+/g, " ").trim();

  return cleaned.length > 0 ? cleaned : fallback;
}

function trimTelegramMessage(message: string) {
  const maxLength = 3900;

  if (message.length <= maxLength) {
    return message;
  }

  return `${message.slice(0, maxLength - 24)}\n\n[Message trimmed]`;
}

async function parseTelegramResponse(response: Response) {
  try {
    return (await response.json()) as TelegramResponse;
  } catch {
    return {
      ok: false,
      description: "Telegram returned an unreadable response.",
    };
  }
}
