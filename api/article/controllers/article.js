module.exports = {
  async find(ctx) {
    console.log(ctx.req)
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search( ctx.query);
    } else {
      entities = await strapi.services.article.find( ctx.query);
    }

    return entities
    .filter(element => {
      if (element.disponible === true) {
        return true
      } else {
        return false
      }
    })
    .map(entity => {
      let article = entity

      if (entity.categories.length != 0) {
        article.categories = []
      }

      entity.categories.map(element => {
          article.categories.push({id: element.id, name: element.name})
        });


      delete article.categories;
      return article
    });
  },
};