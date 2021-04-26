const server = require('../api');
const cheerio = require('cheerio');

class DinoController {
    static async getAllDinoList(_, res) {
        const dinoList = [];

        try {
            const { data } = await server.get('/name/name-az-all.html');

            const $ = cheerio.load(data);

            $('.dinosaurfilter--dinosaur').each((index, el) => {
                const name = $(el)
                    .children('a')
                    .children('.dinosaurfilter--name-unhyphenated')
                    .text()
                    .trim();
                const link = $(el).children('a').attr('href');

                dinoList[index] = { name, link };
            });

            res.status(200).json({
                dinoList
            });
        } catch (error) {
            console.error(error);
        }
    }

    static getDinoDataByName(req, res) {
        const { name } = req.body;

        /**
         * Return
         * name @string
         * pronounciation @string
         * meaning @string
         * image @string
         * 
         */
    }

    static get
}

module.exports = DinoController;
