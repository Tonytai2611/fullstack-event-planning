# Code Citations

## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader ||
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader ||
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET
```


## License: unknown
https://github.com/logantillman/Contree/blob/68894c9600f3fe63faeb773ccee5469aabced151/server/middleware/verifyJWT.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (
```


## License: unknown
https://github.com/jinu2024/PaymentApp/blob/02c29785f919d05e33cf61d7d96969f82824ccab/backend/middleware.js

```
const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (
```

