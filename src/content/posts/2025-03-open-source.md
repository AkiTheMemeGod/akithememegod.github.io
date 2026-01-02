---
title: "What Open Source Taught Me About Power"
date: "2025-03-08"
description: "Lessons from maintaining public code. If you make a mistake, they will screenshot it."
tags: ["open-source", "engineering"]
readTime: "7 min read"
---

Open source removes excuses.

When anyone can read your code, quality matters more. It's the difference between cooking for yourself at 3 AM and cooking for Gordon Ramsay.

## The Public Arena

In a private repo, "it works" is enough. In public, "it works" is the bare minimum. You are fighting for dignity.

> "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."
> — *John Woods* (This is good advice for survival)

### 1. Naming becomes critical
You can't call a variable `tmp` anymore. Someone *will* find it. They *will* judge you.

```javascript
// Private Code (I am ashamed)
const h = (d) => d.filter(x => x.a > 18);

// Public Code (I am a genius)
const getAdultUsers = (users) => {
    return users.filter(user => user.age >= 18);
};
```

### 2. Errors must be understandable
A stack trace isn't documentation. It's a cry for help.

```json
/* 
   If you return "Error: 500" to a user,
   you are basically declaring war on their sanity.
*/
{
  "error": "InvalidPayload",
  "message": "Field 'email' is required. Please fix it.",
  "docs": "https://api.myapp.com/errors/invalid-payload"
}
```

## Unexpected Benefit

Open source made me a better communicator. It forced me to explain my genius to mere mortals.

Good software explains itself. If you have to explain it in a DM, **refactor it**. If you have to explain it twice, **delete the feature**.

Victory favors the readable.
