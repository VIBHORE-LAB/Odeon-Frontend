import { gql } from "@apollo/client";

export const GET_GENRE_STATS = gql`
query GetGenreStats($limit:Int=20, $timeRange: String="medium_term"){
genreStats(limit:$limit,timeRange:$timeRange){
genre
count
}
}


`;