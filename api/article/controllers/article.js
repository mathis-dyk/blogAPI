module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search({ disponible: true});
    } else {
      entities = await strapi.services.article.find({disponible: true});
    }

    return entities.map(entity => {
      let article = entity

      if (article.disponible === true) {
        return article
      }
    });
  },
};