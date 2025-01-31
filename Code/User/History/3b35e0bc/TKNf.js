// display day hour minutes end sacond di console

const now = new Date();
const day = now.getDate();
const hour = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
console.log(day, hour, minutes, seconds);
