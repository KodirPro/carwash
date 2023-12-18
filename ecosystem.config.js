module.exports = {
    apps: [
        {
            name: "car-wash",
            script: "node_modules/next/dist/bin/next",
            args: "start", //running on port 3000
            watch: false,
        },
    ],
};