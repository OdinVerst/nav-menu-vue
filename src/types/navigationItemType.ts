export interface NavigationItemType {
    key: string;
    name: string;
    level: number;
    link: string;
    parentKey?: string;
    children?: NavigationItemType[];
}
