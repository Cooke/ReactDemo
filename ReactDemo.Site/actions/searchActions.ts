 module Actions {
     import Person = Api.IConsultant;

     export interface ISearchActionPayload extends IActionPayload {
         query: string;
     }

     export interface ISearchSuccssesfulPayload extends IActionPayload {
         searchResult: Person[];
     }

     export class SearchActions {
         public static search(query: string) {
             var payload: ISearchActionPayload = {
                 actionType: Types.Search,
                 query: query
             };
             dispatcher.dispatch(payload);

             backend.search(query);
         }

         public static searchSuccess(searchResult: Person[]) {
             var payload: ISearchSuccssesfulPayload = {
                 actionType: Types.SearchSuccess,
                 searchResult: searchResult
             };
             dispatcher.dispatch(payload);
         }

         public static searchError() {
             dispatcher.dispatch({ actionType: Types.SearchError });
         }
     }
 }