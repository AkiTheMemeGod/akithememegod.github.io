---
title: "Designing Backends That Don't Explode on Mobile"
date: "2025-03-14"
description: "Mobile phones are basically potatoes that can do math. Treat them with respect, or they will destroy your retention."
tags: ["flutter", "api", "backend"]
readTime: "7 min read"
---

Flutter clients are unforgiving.

Web browsers are lenient. They have fast CPUs. They have stable electricity. Mobile phones do not. They are running on battery, spotty WiFi, and hope.

## The Flaw: Overfetching (A Capital Offense)

A typical backend developer sends the whole database row because they are lazy.

```json
// Bad API Response (I will find you)
[
  {
    "id": 1,
    "title": "Item 1",
    "description": "Very long text...",
    "history": [ ...1000 items...], // ⚠️ This kills the potato
    "meta": { ... }
  }
]
```

On a desktop, this is fine. On a $100 Android phone, this is **Dropped Frames**. And dropped frames mean the user uninstalls your app.

## The Fix: View Models (DTOs)

I learned to design endpoints specifically for the UI component.

> "The network is the computer, and the network is slow."

### Flutter-Optimized Response (Victory)
```json
// Good API Response
[
  {
    "id": 1,
    "title": "Item 1",
    "thumb_url": "https://..."
  }
]
```

## Designing for Latency (The Enemy)

Mobile networks lie. They say they are `4G` but give you `Edge` speeds.
*   **Optimistic UI**: Assume success. If it fails, revert it and blame the user's internet.
*   **Local Caching**: Store headers locally.

Designing for Flutter made me realize that my APIs were bloated. Now they are lean, mean, data-serving machines.
