/**
 * react-select styles so control width stays fixed (does not shrink when the
 * selected label is shorter). Pair with .wms-field-control in CSS.
 */
export function getListingOrderSelectStyles(extra = {}) {
  return {
    container: (base) => ({
      ...base,
      width: "100%",
    }),
    control: (base) => ({
      ...base,
      width: "100%",
      minWidth: "100%",
      flexShrink: 0,
    }),
    valueContainer: (base) => ({
      ...base,
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
    }),
    singleValue: (base) => ({
      ...base,
      maxWidth: "100%",
    }),
    menu: (base) => ({
      ...base,
      width: "100%",
      minWidth: "100%",
    }),
    ...extra,
  };
}
