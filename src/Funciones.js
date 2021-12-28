const Money = (val) => `$ ${new Intl.NumberFormat("de-DE").format(val)}`;
export { Money };
