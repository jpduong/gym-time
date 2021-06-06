import { UserModel } from "../graphql/entities/User";
import { gCall } from "../test-utils/g-call";
import { setUpTestingDB } from "../test-utils/setup";

setUpTestingDB();

jest.mock("../services/email");

const mockInput = {
  email: "james.duong93@gmail.com",
  password: "password123",
  fullName: "james duong",
};

const dirtyMockInput = {
  email: "    james.duong93@gmail.com     ",
  password: "password123",
  fullName: "    james duong     ",
};

const registerMutation = `mutation($input: RegisterInput!) {
    register(input:  $input) {
      user {
        _id
        email
        fullName
        isEmailVerified
      }
      errors {
        field
        message
      }
    }
  }`;

describe("User resolver", () => {
  describe("register mutation", () => {
    it("returns user response on new email register", async () => {
      const res = await gCall({
        source: registerMutation,
        variableValues: {
          input: mockInput,
        },
      });

      const gResponse = res.data.register;

      expect(gResponse.user._id).toBeDefined();
      expect(gResponse.user.fullName).toEqual(mockInput.fullName);
      expect(gResponse.user.email).toEqual(mockInput.email);
      expect(gResponse.user.isEmailVerified).toEqual(false);
      expect(gResponse.errors).toBeNull();
    });

    it("Returns errors on duplicate email register (same character casing)", async () => {
      await UserModel.create(mockInput);

      const res = await gCall({
        source: registerMutation,
        variableValues: {
          input: mockInput,
        },
      });

      const gResponse = res.data.register;
      expect(gResponse.user).toBeNull();
      expect(gResponse.errors).toBeDefined();
    });

    it("Returns errors on duplicate email register (difference character casing)", async () => {
      await UserModel.create(mockInput);

      const uppercasedEmail = mockInput.email.toUpperCase();

      const res = await gCall({
        source: registerMutation,
        variableValues: {
          input: mockInput,
          email: uppercasedEmail,
        },
      });

      const gResponse = res.data.register;
      expect(gResponse.user).toBeNull();
      expect(gResponse.errors).toBeDefined();
    });

    it("dirty email and firstName input is sanitized and saved into DB", async () => {
      await gCall({
        source: registerMutation,
        variableValues: {
          input: dirtyMockInput,
        },
      });

      const user = await UserModel.findOne({ email: mockInput.email });

      expect(user).toBeDefined();
      expect(user.email).toEqual(mockInput.email);
      expect(user.fullName).toEqual(mockInput.fullName);
    });

    it("New email register hashes password in DB", async () => {
      const res = await gCall({
        source: registerMutation,
        variableValues: {
          input: mockInput,
        },
      });

      const user = await UserModel.findOne({ _id: res.data.register.user._id });

      expect(user.password).not.toEqual(mockInput.password);
    });
  });
});
