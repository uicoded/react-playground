// const response = await fetch('https://api.example.com/data')
// const data = await response.json();

const response = new Promise((resolve) => setTimeout(resolve, 1000, { data: "Hello, World! 🌍" }));
const data = await response;

export { data, response };
