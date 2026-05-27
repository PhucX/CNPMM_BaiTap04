const test = require("node:test");
const assert = require("node:assert/strict");
const User = require("../models/User");
const { login, verifyToken, verifyPassword } = require("../services/authService");

function makeUser(overrides = {}) {
  const user = {
    id: "u-member",
    email: "member@urbanstep.vn",
    password: "123456",
    name: "UrbanStep Member",
    role: "member",
    points: 100,
    loyaltyRank: "Member",
    saveCalled: false,
    async save() {
      this.saveCalled = true;
    },
    toObject() {
      return {
        id: this.id,
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role,
        points: this.points,
        loyaltyRank: this.loyaltyRank
      };
    },
    ...overrides
  };

  return user;
}

test("login returns member data and token for valid credentials", async (t) => {
  const userDoc = makeUser();
  t.mock.method(User, "findOne", async (query) => (
    query.email === "member@urbanstep.vn" ? userDoc : null
  ));

  const result = await login("member@urbanstep.vn", "123456");

  assert.ok(result.token);
  assert.equal(result.user.role, "member");
  assert.equal(result.user.password, undefined);
  assert.equal(userDoc.saveCalled, true);
  assert.equal(verifyPassword("123456", userDoc.password), true);
});

test("verifyToken returns sanitized user", async (t) => {
  const userDoc = makeUser();
  t.mock.method(User, "findOne", async () => userDoc);

  const result = await login("member@urbanstep.vn", "123456");
  const user = await verifyToken(result.token);

  assert.equal(user.email, "member@urbanstep.vn");
  assert.equal(user.password, undefined);
});

test("login rejects invalid credentials", async (t) => {
  t.mock.method(User, "findOne", async () => makeUser());

  assert.equal(await login("member@urbanstep.vn", "wrong"), null);
});

test("verifyToken rejects malformed token without throwing", async () => {
  assert.equal(await verifyToken("bad.token.x"), null);
});
