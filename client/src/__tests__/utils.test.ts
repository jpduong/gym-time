import { FieldError } from "types/generated";
import { hasPasswordString } from "utils/has-password-string";
import { removeDoubleSpaces } from "utils/sanitize-input";
import { toErrorMap } from "utils/to-error-map";
import { createMaxText } from "utils/validation-text-creater";

describe("utils", () => {
  describe("removeDoubleSpaces", () => {
    const fullNameWithTwoMiddleSpace = "  james  duong  ";
    const fullNameWithThreeMiddleSpace = "  james   duong  ";
    const expectedRes = "james duong";

    it("should sanitize full name with two middle spaces to one middle space", () => {
      const sanitizedString = removeDoubleSpaces(fullNameWithTwoMiddleSpace);

      expect(sanitizedString).toEqual(expectedRes);
    });

    it("should sanitize full name with three middle space to one middle space", () => {
      const sanitizedString = removeDoubleSpaces(fullNameWithThreeMiddleSpace);

      expect(sanitizedString).toEqual(expectedRes);
    });
  });

  describe("toErrorMap", () => {
    const mockErrors: FieldError[] = [
      { field: "email", message: "required" },
      { field: "password", message: "required" },
    ];
    const mappedErrors = toErrorMap(mockErrors);

    it("should return Object type", () => {
      expect(mappedErrors instanceof Object).toBe(true);
    });

    it("should return correct amount of keys", () => {
      expect(Object.keys(mappedErrors).length).toBe(mockErrors.length);
    });
  });

  it("createMaxText should have arg in returned result", () => {
    const no = 2;

    expect(createMaxText(no)).toContain(no);
  });

  it("hasPasswordString should return truthy for password string", () => {
    expect(hasPasswordString("password")).toBeTruthy();
  });
});
