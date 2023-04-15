export const getTotal = (entry) => {
    let res = 0;
    entry.forEach(art => res += art.prezzo);
    return res;
}