export function formatNumberPhone(number) {
    if(number)
        return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`
}