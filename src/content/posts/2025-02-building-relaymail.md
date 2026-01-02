---
title: "Why I Built My Own Mailing API (Because SaaS is a Scam)"
date: "2025-02-18"
description: "When third-party services charge you $100 to send an email. I took that personally."
tags: ["backend", "saas", "infrastructure"]
readTime: "6 min read"
---

Email APIs are supposed to save time.

But recently, they started charging money. Like, real money.

> "We are stuck with technology when what we really want is just stuff that works."
> — *Douglas Adams* (He would have hated monthly subscriptions)

## The Trigger

I was paying $100/mo for a service that gave me random 500 errors.
*   ❌ Cost scaling faster than usage
*   ❌ Random SMTP timeouts
*   ❌ Zero visibility into delivery logs

I realized I could build this better in a weekend. So I did. **RelayMail**.

## What Changed? (Everything)

### 1. Simple vs Bloated Payload
Most email APIs require JSON structures so complex you need a PhD to read them. RelayMail sends emails, it doesn't solve calculus.

```json
// The unnecessary complexity of others
// Why do I need an array of objects inside an object?
{
  "messages": [{
    "from": { "email": "me@site.com", "name": "Me" },
    "to": [{ "email": "user@site.com" }],
    "subject": "Hello",
    "text": "Hi"
  }]
}

// RelayMail (Elegance)
{
  "to": "user@site.com",
  "subject": "Hello",
  "body": "Hi"
}
```

### 2. Predictable Performance
By managing our own queues in Redis, we know exactly where every email is. We don't guess. We know.

```bash
# Redis Queue Status (Look at those numbers go)
$ queue:emails:pending -> 0
$ queue:emails:processing -> 150/sec
$ queue:emails:failed -> 0  (As it should be)
```

## The Lesson

Build vs buy isn’t about ego. (Okay, maybe a little bit about ego).

It’s about **control**. If the "easy" tool defeats you, build the tool yourself. Establish dominance over your infrastructure.
