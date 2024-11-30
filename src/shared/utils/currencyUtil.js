export const parseRupiah = (value) => {
    if (typeof value === 'number') {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    } else if (typeof value === 'string') {
        return value.startsWith('Rp')
            ? value.replace('Rp', '').trim()
            : value.trim();
    }
    return value;
};


export const formatRupiah = (value, prefix = "Rp. ") => {
    value = `${value}`
    if (!value) return "";
    const rawValue = value.startsWith(prefix) ? value.slice(prefix.length) : value;
    const numberString = rawValue.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const restNumber = split[0].length % 3;
    let rupiah = split[0].substring(0, restNumber);
    const thousand = split[0].substring(restNumber).match(/\d{3}/gi);

    if (thousand) {
        const separator = restNumber ? "." : "";
        rupiah += separator + thousand.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix + rupiah;
};

export const parseRupiahIntoString = (formattedValue) => {
    if (!formattedValue) return 0;
    const rawValue = formattedValue.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    return parseInt(rawValue, 10); // Convert to an integer
};
