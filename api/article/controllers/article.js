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

      if (entity.categories.length != 0) {
        article.categories = []
      }

      entity.categories.forEach(element => {
        article.categories.push({id: element.id, name: element.name})
      });

      delete article.categories

      if (article.disponible === true) {
        return article
      }
    });
  },
};