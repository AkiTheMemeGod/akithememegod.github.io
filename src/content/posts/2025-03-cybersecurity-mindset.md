---
title: "Thinking Like an Attacker (Paranoia is a Virtue)"
date: "2025-03-20"
description: "How cybersecurity training reshaped how I write code. I assume everyone is trying to destroy me."
tags: ["cybersecurity", "security"]
readTime: "7 min read"
---

Learning how systems break changes how you build them. It ruins your ability to enjoy software, but it makes you a better engineer.

> "Defenders have to be right 100% of the time. Attackers only have to be right once."
> — *Generic Infosec Proverb* (But it's true)

## The Attacker Mindset

Most developers think: *"How do I make this work?"*
I think: *"How do I make this fail so spectacularly that the server catches fire?"*

### 1. Assume Misuse
I used to trust the frontend. I was young and naive. Now I assume every HTTP request is a lie constructed by my enemies.

**Before (Naïve):**
```javascript
// Trusting the User ID from the body
// This is how you get hacked.
app.post('/update', (req, res) => {
    db.updateUser(req.body.id, req.body.data);
});
```

**After (Paranoid):**
```javascript
// Ignoring the body, using the Session
// I verify everything.
app.post('/update', (req, res) => {
    const userId = req.session.userId; // Trusted Source
    db.updateUser(userId, req.body.data);
});
```

### 2. Never Trust Input
If a field says "Age", someone sends `DROP TABLE users;`.
If a field says "Image", someone sends a 5GB text file to crash your RAM.

## Result

My code became annoying to write but impossible to break.
*   **Cleaner validation** (I reject almost everything)
*   **Stronger defaults** (Deny all)
*   **Fewer surprises** (I hate surprises)

Security isn’t paranoia. It’s purely rational behavior in a hostile universe.
