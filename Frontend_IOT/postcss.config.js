const purgecss = require('@fullhuman/postcss-purgecss')
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        purgecss({
            content: [
                './src/**/*.js',
                './index.html'
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        })
    ]
}
