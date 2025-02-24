export type SRSearch = {
    data: {
        children: SearchChild[]
    }
}

export type SearchChild = {
    data: {
        id: string;
        display_name: string;
    }
}

export type SubReddit = {
    id: string;
    name: string;
}