---
title: "AnarchKey: Zero Trust because I Trust No One"
date: "2025-01-18"
description: "Why I encrypt everything. Even the encryption keys. If you want my data, you'll have to take it from my cold, dead RAM."
tags: ["security", "encryption", "backend", "cryptography"]
readTime: "9 min read"
---

API keys are everywhere. And they are usually sitting in plain text like a loot drop waiting for a goblin.

I decided this was unacceptable.

**AnarchKey** was my answer. A system so paranoid it doesn't even trust itself.

## Threat Model First (Paranoia is a Virtue)

Before writing code, I asked one question:

> **"If a hacker downloads my entire database, do they win?"**

If the answer is yes, you have already lost. In my system, if they download the database, they get a bunch of garbage random bytes. Good luck decrypting that.

## Core Principles

### 1. End-to-End Encryption
Keys are encrypted *before* they hit the database. The server never logs usable secrets.

```rust
// The database only ever sees this:
// (It's useless without the master key, which is in my head)
pub struct EncryptedKey {
    pub id: Uuid,
    pub ciphertext: Vec<u8>, // AES-256-GCM (The good stuff)
    pub nonce: [u8; 12],
    pub tag: [u8; 16]
}
```

### 2. Zero Trust by Default
I assume the network is hostile. I assume the load balancer is a spy. I assume the user is trying to destroy me.

*   ❌ No implicit trust.
*   ❌ No "admin" backdoors.
*   ✅ Mutual TLS (mTLS) everywhere.

### 3. Silence is Golden
No unnecessary endpoints. No verbose error messages. If you send a bad request, the server ignores you. It doesn't even say "401 Unauthorized". It just closes the socket.

```bash
# A typical response in AnarchKey
HTTP/1.1 401 Unauthorized
Content-Length: 0
# (The sound of silence)
```

## Engineering Takeaway

Security isn’t something you “add later”. That's like putting on armor *after* you get stabbed.

It’s a design decision you make **before the first line of code**. AnarchKey taught me that good security feels boring. And boring is safe.
