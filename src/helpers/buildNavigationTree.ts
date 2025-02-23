import { NavigationItemType } from "../types/navigationItemType";

interface ServerResponse {
  pages: Record<string, NavigationItemType & { childPageKeys?: string[] }>;
  rootLevelKeys: string[];
}

export const buildNavigationTree = (
  response: ServerResponse,
): NavigationItemType[] => {
  const { pages, rootLevelKeys } = response;

  const buildNode = (key: string, path?: string[]): NavigationItemType => {
    const page = pages[key];
    const fullPath = path ? [...path, page.key] : [page.key];
    const node: NavigationItemType = { ...page, children: [], path: fullPath };

    if (page.childPageKeys && page.childPageKeys.length > 0) {
      node.children = page.childPageKeys.map((childKey) =>
        buildNode(childKey, fullPath),
      );
    }
    return node;
  };

  return rootLevelKeys.map((rootKey) => buildNode(rootKey));
};
