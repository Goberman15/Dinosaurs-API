const server = require('../api');
const cheerio = require('cheerio');
const { capitalize } = require('../helpers/capitalize.js');
const getDinoList = require('../helpers/getDinoList');

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

    static async getDinoDataByName(req, res) {
        const { name } = req.params;

        try {
            const { data } = await server.get(`/${name.toLowerCase()}.html`);

            const $ = cheerio.load(data);
            const dinoData = {};

            dinoData.Name = $('.dinosaur--name-unhyphenated').text();
            dinoData.pronounciation = $('.dinosaur--pronunciation').text();
            dinoData.meaning = $('.dinosaur--meaning').text().slice(1, -1);
            dinoData.picture = $('.dinosaur--image').attr('src');
            dinoData.content = $('.dinosaur--content-container')
                .children('p')
                .text()
                .trim();

            $('.dinosaur--list')
                .children('dt')
                .each((_, el) => {
                    const key = $(el).text().slice(0, -1);
                    const val = $(el)
                        .next('dd')
                        .text()
                        .trim()
                        .replace(/\n\t+\n\t+/, ' ');
                    dinoData[key] = val;
                });

            res.status(200).json({
                ...dinoData
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoEra(req, res) {
        try {
            const { data } = await server.get('');
            const $ = cheerio.load(data);
            const dinoEra = [];

            $('.dinosaurnav--category-timeperiod')
                .children()
                .children('a')
                .each((idx, el) => {
                    const era = $(el).text().trim();
                    const link = $(el).attr('href');
                    dinoEra[idx] = { era, link };
                });

            res.status(200).json({
                dinoEra
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoFoundPlace(req, res) {
        try {
            const { data } = await server.get('');
            const $ = cheerio.load(data);
            const dinoFoundPlace = [];

            $('.dinosaurnav--category-country')
                .children()
                .children('a')
                .each((idx, el) => {
                    const foundPlace = $(el).text().trim();
                    const link = $(el).attr('href');
                    dinoFoundPlace[idx] = { foundPlace, link };
                });

            res.status(200).json({
                dinoFoundPlace
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoType(req, res) {
        try {
            const { data } = await server.get('');
            const $ = cheerio.load(data);
            const dinoType = [];

            $('.dinosaurnav--category-bodytype')
                .children()
                .children('a')
                .each((idx, el) => {
                    const type = $(el).text().trim();
                    const link = $(el).attr('href');
                    dinoType[idx] = { type, link };
                });

            res.status(200).json({
                dinoType
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoFood(req, res) {
        try {
            const { data } = await server.get('');
            const $ = cheerio.load(data);
            const foodType = {
                'Other animals': 'Carnivore',
                Plants: 'Herbivore',
                'Plants and animals': 'Omnivore'
            };
            const dinoDiet = [];

            $('.dinosaurnav--category-diet')
                .children()
                .children('a')
                .each((idx, el) => {
                    const diet = foodType[$(el).text().trim()] || 'Unknown';
                    const link = $(el).attr('href');
                    dinoDiet[idx] = { diet, link };
                });

            res.status(200).json({
                dinoDiet
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoListByEra(req, res) {
        const { era } = req.params;
        const formatEra = era.replace(/\W/g, '-').toLowerCase();
        try {
            const { data } = await server.get(
                `/timeline/${formatEra}/gallery.html`
            );
            const $ = cheerio.load(data);
            const dinoList = getDinoList($);

            res.status(200).json({
                dinoList,
                count: dinoList.length
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoListByFoundPlace(req, res) {
        const { found_place } = req.params;
        try {
            const { data } = await server.get(
                `/country/${found_place.toLowerCase()}/gallery.html`
            );
            const $ = cheerio.load(data);
            const dinoList = getDinoList($);

            res.status(200).json({
                dinoList,
                count: dinoList.length
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoListByBodyType(req, res) {
        const { body_type } = req.params;
        const formatBodyType = body_type.replace(/\W/g, '-').toLowerCase();
        try {
            const { data } = await server.get(
                `/body-shape/${formatBodyType}/gallery.html`
            );
            const $ = cheerio.load(data);
            const dinoList = getDinoList($);

            res.status(200).json({
                dinoList,
                count: dinoList.length
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoListByDietType(req, res) {
        const { diet } = req.params;
        try {
            const { data } = await server.get(
                `/diet/${diet.toLowerCase()}/gallery.html`
            );
            const $ = cheerio.load(data);
            const dinoList = getDinoList($);

            res.status(200).json({
                dinoList,
                count: dinoList.length
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }

    static async getDinoListByName(req, res) {
        const { alphabet } = req.params

        try {
            const { data } = await server.get(
                `/name/${alphabet.toLowerCase()}/gallery.html`
            );
            const $ = cheerio.load(data);
            const dinoList = getDinoList($);

            res.status(200).json({
                dinoList,
                count: dinoList.length
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error
            });
        }
    }
}

module.exports = DinoController;
