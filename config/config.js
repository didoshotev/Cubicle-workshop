module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://test123:test123123@cluster0.a7hhx.mongodb.net/Cubicle-workshop?retryWrites=true&w=majority`,
        privateKey: 'DEFFECT'
    },
    production: {}
}