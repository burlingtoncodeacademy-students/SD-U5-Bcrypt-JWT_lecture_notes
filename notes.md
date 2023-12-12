## Bcrypt
`npm i bcrypt`
- dependency that handles encryption of data
  - mostly commonly for passwords (but not limited)

```js
bcrypt.compare(password, user.password);
// compare(string, hased value from DB)
```

## Encryption
- Plain text passwords are not secure when stored within the database.
  - Allows another lever of security for both user and application
    - If the database never knows it, less desired to "hack".

## Hashing
- An algoithm to change plain text into various characters.
  - transformed as a **one-way value**. 
  - practically impossible to turn hashed value back to original string.
- Encrypted prior to storing in DB
- No matter length of string (password), hash value is the same length.
  - Like strings will result in the same hashed input.
  - **needs `salting`**

## Salting
- includes random strings within the plain text being hashed.
- Makes for unpredictability for the hashed value.
- We can denote the number of "salts"
  - Good value is 10-13 iterations.

example code:
```js
bcrypt.hashSync("abc123", 10);
```
- first param = password
- second param = number of times the password will be salted.

## JWT
- JSON Web Token
- `npm i jsonwebtoken`
- A way for our server to authenticate the user.

example code:
```js
const token = jwt.sign({id: user._id}, "secret message", {expiresIn: 60 * 60 * 24});
```
- `sign(payload, message, options)` 
  - 3 arguments:
    - payload
      - In the sample we are using an object that details the id of the user.
    - encrypt/decrypt message
      - passed in as a string in the sample
      - Typically stored as a `.env` variable.
    - Options sets (expiration)
      -  represents seconds or a string time span
         -  ex: `"2 days"` or `"10h"`

