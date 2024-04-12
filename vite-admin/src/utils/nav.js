export function formatRoutes(routes) {
  //根据导航信息对路由进行进一步过滤和格式化，以便于在页面中显示导航菜单
  return filterNavRoutes(routes);
}

export function filterNavRoutes(routes) {
  let result = [];
  routes.forEach((data) => {
    if (data.meta && data.meta.nav && data.meta.nav.headerTitle) {
      let item = {
        name: data.name,
        meta: data.meta
      };
      if (data.children) {
        item.children = filterNavRoutes(data.children);
      }
      result.push(item);
    } else if (data.children) {
      filterNavRoutes(data.children).forEach((item) => {
        result.push(item);
      });
    }
  });
  return result;
}
