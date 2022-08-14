export const renderPriceTag = (price: number) => {
    return Intl.NumberFormat('hu').format(price)
}