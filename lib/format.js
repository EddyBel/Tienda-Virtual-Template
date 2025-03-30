export const formatMoney = (value) => {
  const formatoMonedaMX = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatoMonedaMX.format(value);
};
