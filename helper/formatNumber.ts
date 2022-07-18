export default function formatNumber(n: number) {
  var format = n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return `${format} $`;
}
