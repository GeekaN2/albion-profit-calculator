/**
 * Check the date
 * if more than 1 day has passed since the last check
 * returns true
 */
export const isOutdated = (date: Date | string | number) => {
    const day = 24 * 60 * 60 * 1000;

    return Date.now() - new Date(date).getTime() > day;
}

/**
 * Add h(hours) or d(days) to date
 */
export const formatDate = (date: string | number | Date) => {
    if (!date) {
        return '-';
    }

    date = new Date(date);

    let lastCheckInHours = Math.floor(
        (Date.now() - date.getTime()) / 3600000
    );

    let lastCheckInDays = Math.floor(lastCheckInHours / 24);

    if (lastCheckInDays > 100) {
        return "∞";
    }

    return lastCheckInHours < 24
        ? lastCheckInHours + 'h'
        : Math.floor(lastCheckInHours / 24) + 'd'
};

export const formatPrice = (price: number) => {
    const roundedPrice = Math.round(price);

    return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const roundPrice = (price: number, numbersAfterComma: number) => {
    return Number.parseFloat(price?.toFixed(numbersAfterComma));
}