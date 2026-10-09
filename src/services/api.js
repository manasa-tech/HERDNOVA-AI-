const API_BASE = (
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "");

export async function askHerdNova({
  message,
  language = "English",
}) {
  let response;

  try {
    response = await fetch(`${API_BASE}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        language,
      }),
    });
  } catch {
    throw new Error(
      "Cannot connect to HerdNova backend. Make sure FastAPI is running on port 8000."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data.detail === "string"
        ? data.detail
        : `Backend request failed: ${response.status}`
    );
  }

  const answer =
    data?.plan?.summary ||
    data?.answer ||
    data?.response ||
    data?.reply;

  if (!answer) {
    throw new Error(
      "Backend responded, but no answer was returned. Check the API response."
    );
  }

  return answer;
}