export interface IArticleFilter {
    region: string;
    topic: string;
    language: string;
}

export type filterItem = 'region'| 'topic'| 'language';