export const currentTime = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = formatZero(time.getMonth()+1);
    let date = formatZero(time.getDate());
    let hour = formatZero(time.getHours());
    let min = formatZero(time.getMinutes());
    return `${year}${month}${date}${hour}${min}`
}

const formatZero = (number) => (
    ("0" + number).slice(-2)
)