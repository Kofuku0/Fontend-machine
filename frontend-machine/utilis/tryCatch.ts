/*Excellent.
Below is the **diagram-based teaching module**, written exactly like a lesson you would study or teach.
No shortcuts, no assumptions.

---

# MODULE 2: Request Flow + `try–catch` (Diagram-Based Explanation)

---

## 1. The Full Request Lifecycle (Big Picture)

Every request follows this **fixed path**:

```
Client (Browser / JS)
        ↓
   Network Layer
        ↓
     Server
        ↓
   Network Layer
        ↓
Client (Response)
```

**Important:**
`try...catch` does **NOT** watch this whole pipeline.
It only watches **what JavaScript receives**.

---

## 2. Where `try–catch` Actually Sits

```
Client JS
 ┌─────────────────────┐
 │   try { await fetch }│  ← JS waits here
 │                     │
 │   Promise resolves? │───► stays in try
 │   Promise rejects?  │───► jumps to catch
 └─────────────────────┘
```

👉 `try–catch` **does NOT know**

* how the server behaved
* what HTTP status means

It only knows:

> Did the Promise resolve or reject?

---

## 3. Scenario Diagrams (MOST IMPORTANT PART)

---

## Scenario 1

### ✅ Request reached server AND response reached client

```
Client → Network → Server → Network → Client
```

Examples:

* 200 OK
* 401 Unauthorized
* 404 Not Found
* 500 Internal Server Error

### JavaScript View:

```
fetch() → Promise RESOLVED
```

### Code Flow:

```js
try {
  const res = await fetch("/api/login");
  console.log(res.status);
} catch {}
```

✔ Always **try block**
❌ Never catch automatically

---

## Scenario 2

### ❌ Request NEVER reached server

```
Client ✖ Network ✖ Server
```

Examples:

* No internet
* DNS failure
* Wrong domain
* CORS blocked

### JavaScript View:

```
fetch() → Promise REJECTED
```

### Code Flow:

```js
try {
  await fetch("https://wrongdomain.xyz");
} catch (err) {
  // runs
}
```

✔ **catch block**

---

## Scenario 3

### ❌ Request reached server BUT response never reached client

```
Client → Network → Server ✖ Network ✖ Client
```

Examples:

* Server crashed mid-response
* Timeout
* Proxy failure

### JavaScript View:

```
fetch() → Promise REJECTED
```

✔ **catch block**

---

## Scenario 4: URL is wrong (Two very different meanings)

---

### 4A — Wrong route, correct domain

```
Client → Network → Server (route not found) → Client
```

Server response:

```
404 Not Found
```

### JavaScript View:

```
Promise RESOLVED
```

✔ try block
❌ not catch

---

### 4B — Wrong domain

```
Client ✖ DNS ✖ Server
```

### JavaScript View:

```
Promise REJECTED
```

✔ catch block

---

## 4. Visual Summary Table (Diagram Logic)

| Situation            | Diagram Result  | JS Promise | Block |
| -------------------- | --------------- | ---------- | ----- |
| 200 OK               | Full round-trip | Resolved   | try   |
| 404 route            | Full round-trip | Resolved   | try   |
| 500 server error     | Full round-trip | Resolved   | try   |
| No internet          | No server       | Rejected   | catch |
| Wrong domain         | DNS fail        | Rejected   | catch |
| CORS blocked         | Browser stops   | Rejected   | catch |
| Server crash mid-way | No response     | Rejected   | catch |

---

## 5. Why HTTP Errors Don’t Trigger `catch`

### Because HTTP belongs here:

```
Server Logic Layer
```

### And `try–catch` belongs here:

```
JavaScript Runtime Layer
```

They are **two separate systems**.

---

## 6. Turning HTTP Errors into JS Errors (Bridge Pattern)

To **connect** both worlds, we manually throw:

```js
try {
  const res = await fetch("/api/login");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  console.log(data);

} catch (err) {
  console.error("Handled:", err.message);
}
```

Now the flow becomes:

```
HTTP error → throw → JS error → catch
```

---

## 7. Golden Memory Diagram (Never Forget)

```
Response received?
   ├── YES → try block
   └── NO  → catch block
```

---

## 8. Interview-Ready One-Liner

> `fetch` only rejects on network or JavaScript failures.
> HTTP status codes resolve the Promise and must be handled manually.

---

## 9. Reference Code (Final)
*/

async function doSomething() {
  try {
    const res = await fetch("/api/login");
    console.log(res);
  } catch (err) {
    // network error, DNS, CORS, JS error
    console.error(err);
  }
}



