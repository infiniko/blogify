export type Page<T> = {
    content: T[];
    page: number;
    size: number;
    total: number;
}

export type Article = {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    publishedAt: string | null;
    author: Author;
    reactions: Record<Reaction, ReactionDetails>
}


export type Author = {
    id: number;
    name: string;
    handle: string;
    image: string | null;
}

export type Reaction = 'like' | 'hot' | 'readlater';
export type ReactionDetails = { count: number, reacted: boolean }

export const AVAILABLE_REACTIONS: Reaction[] = ['readlater', 'hot', 'like'];