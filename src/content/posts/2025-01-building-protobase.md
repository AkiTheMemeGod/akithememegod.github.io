---
title: "Building ProtoBase: Because Config Files are for Weaklings"
date: "2025-01-12"
description: "I was tired of typing the same boilerplate code 100 times. So I automated it. Now I have free time to play Minecraft."
tags: ["backend", "api", "flask", "developer-experience"]
readTime: "7 min read"
---

ProtoBase started as a deep, primal frustration.

Every backend project begins the same way: install dependencies, configure the database, setup authentication, cry about CORS errors. None of it is hard. It's just boring.

> "The ratio of time spent reading code versus writing is well over 10 to 1."
> — *Robert C. Martin* (He was talking about Clean Code, but I'm talking about sanity)

So I built ProtoBase. The goal? **Destroy friction.**

## The Core Idea

ProtoBase focuses on removing features. Yes, you heard me. Features are just bugs waiting to happen. The goal was to let developers go from idea to API before they lost the will to live.

## Key Design Decisions

### 1. Opinionated Defaults vs "Config Hell"
Most frameworks give you choices. Choice is weakness. I give you defaults.

**The "Config Hell" Approach:**
```json
// I hate this. You hate this. Everyone hates this.
{
  "auth": { "type": "jwt", "alg": "HS256", "expiry": 3600 },
  "db": { "pool": 5, "timeout": 3000 },
  "cors": { "origin": "*" }
}
```

**The ProtoBase Approach (Superiority):**
```python
# One line to rule them all
# Authenticated, Limiter-enabled, Database-connected.
app = ProtoBase(name="my-api", secure=True)
```

### 2. Flask Over Complexity
I chose Flask because I like control. I want to know exactly when my server crashes.

*   ✅ Predictable behavior (It crashes when I tell it to)
*   ✅ No hidden ORM costs (SQLAlchemy is a necessary evil)
*   ✅ Instant startup time (Faster than you can blink)

## What I Learned
Developer experience is a feature.

If your API takes 3 hours to set up, I'm not using it. I'm going back to writing raw SQL in a text file. ProtoBase reinforced a belief I still hold: **the best tools get out of the way.**
