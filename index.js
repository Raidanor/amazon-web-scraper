const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.amazon.ca/s?k=camera&crid=3E1GKU8CYWWNI&sprefix=camera%2Caps%2C92&ref=nb_sb_noss_1'

axios(url)
    .then(response => 
        {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = []

            var $array = $('.a-section,a-spacing-small,puis-padding-left-small,puis-padding-right-small')

            $array.each(function()
            {
                
                const price = $(this).find('div > div > div > a > span > span > span').text()

                
                const description = $(this).find('div > h2').text();
                
                articles.push(
                    {
                        price, description
                    }
                )
            })

            console.log(articles)
            
        }).catch(err => console.log(err))


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));