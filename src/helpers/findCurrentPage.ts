import {NavigationItemType} from "../types/navigationItemType";

export const findCurrentPage = (pages: NavigationItemType[], link: string): NavigationItemType | null => {
    for (const page of pages) {
        if (page.link && link.includes(page.link.toLowerCase())) {
            return page;
        }

        if (page.children && page.children.length) {
            const found = findCurrentPage(page.children, link);
            if (found) return found;
        }
    }
    return null;
};
