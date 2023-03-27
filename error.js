setTimeout(() => {
    throw new Error("Oooooooops");
})

process.on("uncaughtException", () => {
    // handle it
})

process.on("unhandledRejection", () => {
    // handle it
})