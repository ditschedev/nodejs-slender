module.exports = {
    mailer: {
        from: process.env.EMAIL_FROM || 'no-reply@localhost',
        base_url: process.env.BASE_URL || 'http://localhost:3000'
    }
};