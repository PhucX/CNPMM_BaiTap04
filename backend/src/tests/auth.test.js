const test = require("node:test");
const assert = require("node:assert/strict");
const { login, verifyToken } = require("../services/authService");

test("login returns member data and token for valid credentials", () => {
  const result = login("member@urbanstep.vn", "123456");

  assert.ok(result.token);
  assert.equal(result.user.role, "member");
  assert.equal(result.user.password, undefined);
});

test("verifyToken returns sanitized user", () => {
  const result = login("member@urbanstep.vn", "123456");
  const user = verifyToken(result.token);

  assert.equal(user.email, "member@urbanstep.vn");
  assert.equal(user.password, undefined);
});

test("login rejects invalid credentials", () => {
  assert.equal(login("member@urbanstep.vn", "wrong"), null);
});

test("verifyToken rejects malformed token without throwing", () => {
  assert.equal(verifyToken("bad.token.x"), null);
});
