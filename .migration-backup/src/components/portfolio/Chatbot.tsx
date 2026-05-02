import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const SUGGESTIONS = [
  "What does she/he do?",
  "Top projects?",
  "What tech stack?",
  "How can I hire?",
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm the AI assistant for this portfolio. Ask me anything about the owner's skills, projects, or experience.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-chatbot", onOpen);
    return () => window.removeEventListener("open-chatbot", onOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content !== "" && prev.length > next.length) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Too many requests. Try again in a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted. Please add funds.");
        else toast.error("Couldn't reach the AI assistant.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong reaching the assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI chatbot"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow animate-pulse-glow transition-transform hover:scale-110",
          open && "scale-0",
        )}
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] glass rounded-2xl shadow-elevated flex flex-col overflow-hidden transition-all origin-bottom-right",
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-semibold leading-none">AI Assistant</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Knows everything about me
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="p-2 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted/70 border border-border rounded-bl-sm",
                )}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-strong:text-primary">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-muted/70 border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="h-2 w-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-border bg-muted/40 hover:border-primary/60 hover:text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-border flex gap-2 bg-card/60"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about me…"
            className="flex-1 bg-muted/60 border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-10 w-10 flex-shrink-0 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
