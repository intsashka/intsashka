const {streamToPromise,SitemapStream, SitemapIndexStream} = require('sitemap')
const {Readable} = require('stream')
const {join} = require('path')
const {writeFileSync} = require('fs')

const PATH = '/Users/intsashka/Projects/intsashka/sitemaps';
const host = 'https://intsashka.github.io/intsashka/';
const sitemapsHost = 'https://intsashka.github.io/intsashka/sitemaps/';

// An array with your links
// const links = [{url: '/page-1/', changefreq: 'daily', priority: 0.3}]

// Create a stream to write to
// const stream = new SitemapStream({hostname: 'https://...'})

// Return a promise that resolves with your XML string
// return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
//     data.toString()
// )
//

(async () => {


    const sitemapIndexStream = new SitemapIndexStream();
    ['sitemap-1.xml', 'sitemap-2.xml', 'sitemap-3.xml'].forEach((url) => sitemapIndexStream.write({url: sitemapsHost + url}));
    sitemapIndexStream.end();

    writeFileSync(join(PATH, 'sitemap.xml'), await streamToPromise(sitemapIndexStream))

    for (let i = 1; i <= 3; ++i) {
        const sitemapStream = new SitemapStream({
            xmlns: {
                xhtml: true,
                news: false,
                image: false,
                video: false,
            },
        })

        sitemapStream.write({url: host + i + '.html'})
        sitemapStream.end();

        writeFileSync(join(PATH, `sitemap-${i}.xml`), await streamToPromise(sitemapStream))
    }

// return streamToPromise(sitemapIndexStream)

})()