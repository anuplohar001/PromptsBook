export const checkEnvironment = () => {
    let local = "http://localhost:3000"
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "http://prompts-book.vercel.app";

    return base_url;
}