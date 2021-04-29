const getDinoList = ($) => {
    const dinoList = []
    $('.dinosaurfilter--dino-list')
        .children('li')
        .each((_, el) => {
            const name = $(el)
                .children()
                .children('.dinosaurfilter--name-unhyphenated')
                .text()
                .trim();
            const link = $(el).children('a').attr('href');
            const image = $(el).children().children('img').attr('src');
            dinoList.push({ name, link, image });
        });
    
    return dinoList;
}

module.exports = getDinoList;
