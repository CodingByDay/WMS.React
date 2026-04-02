import DataAccess from "./DataAccess";

describe("DataAccess", () => {
  const sample = {
    Properties: {
      Items: [
        { Name: "Chosen", StringValue: "old" },
        { Name: "Code", StringValue: "ABC" },
      ],
    },
  };

  test("getData returns property by name and type", () => {
    expect(DataAccess.getData(sample, "Code", "StringValue")).toBe("ABC");
    expect(DataAccess.getData(sample, "Missing", "StringValue")).toBe("");
  });

  test("setDataSelected replaces Chosen and returns updated object", () => {
    const next = DataAccess.setDataSelected(sample, "new-value");
    expect(DataAccess.getData(next, "Chosen", "StringValue")).toBe("new-value");
    expect(DataAccess.getData(next, "Code", "StringValue")).toBe("ABC");
  });
});
