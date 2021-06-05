import { removeDoubleSpaces } from "../utils/sanitize-input";

const fullNameWithTwoMiddleSpace = "  james  duong  ";
const fullNameWithThreeMiddleSpace = "  james   duong  ";
const expectedRes = "james duong";

describe("test utils", () => {
  describe("removeDoubleSpaces", () => {
    it("sanitizes full name with two middle space", () => {
      const sanitizedString = removeDoubleSpaces(fullNameWithTwoMiddleSpace);

      expect(sanitizedString).toEqual(expectedRes);
    });

    it("sanitizes full name with three middle space", () => {
      const sanitizedString = removeDoubleSpaces(fullNameWithThreeMiddleSpace);

      expect(sanitizedString).toEqual(expectedRes);
    });
  });
});
