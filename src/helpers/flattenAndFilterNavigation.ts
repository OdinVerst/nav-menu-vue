import { NavigationItemType } from "../types/navigationItemType";

export const flattenAndFilterNavigation = (
  items: NavigationItemType[],
  searchQuery: string,
): NavigationItemType[] => {
  return items.reduce((acc: NavigationItemType[], item) => {
    if (item.name.toLowerCase().includes(searchQuery)) {
      acc.push(item);
    }

    if (item.children) {
      acc = acc.concat(flattenAndFilterNavigation(item.children, searchQuery));
    }
    return acc;
  }, []);
};
