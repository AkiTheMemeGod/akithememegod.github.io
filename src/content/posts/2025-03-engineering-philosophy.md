---
title: "My Engineering Philosophy (How to Not Write Garbage)"
date: "2025-03-28"
description: "I value software that ages well. If you have to explain your code, you have failed."
tags: ["engineering", "philosophy"]
readTime: "8 min read"
---

I value software that ages well. I've seen too many "modern" codebases rot in six months because the developers chased every shiny new framework.

## Core Beliefs

### 1. Clarity beats cleverness
If you have to explain your "clever" one-liner, it's bad code. You are not writing poetry. You are writing instructions for a machine.

```python
# Clever (Bad)
# Who wrote this? Why?
return [u for u in users if (u.age > 18) ^ (u.status == 'active')]

# Clear (Good)
# Even a toddler could read this.
is_adult = user.age > 18
is_active = user.status == 'active'
return users.filter(lambda u: is_adult and not is_active)
```

### 2. Security is non-negotiable
It is not a "v2 feature". It is the foundation. If it's not secure, it's not "MVP", it's a liability. If you leave a port open, that's on you.

### 3. Simple systems survive longer
Complex systems collapse under their own weight. Simple systems can be fixed at 3 AM when everything is on fire.

> "Simplicity is the ultimate sophistication."
> — *Leonardo da Vinci* (He would have been a great backend engineer)

## Final Thought

Code is written once.
It’s read for years.

I write code so that my future self doesn't want to travel back in time to fight me.
