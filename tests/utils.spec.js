describe("Utils Tests", () => {
  describe("Random Luck", () => {
    it("should return a type boolean", () => {
      expect(typeof randomLuck(3, 3)).toBe("boolean");
    });
    it("should always return true if win condition and length are equal", () => {
      expect(randomLuck(3, 3)).toEqual(true);
    });
    it("should always return true if win condition > length", () => {
      expect(randomLuck(5, 3)).toEqual(true);
    });
  });
});
