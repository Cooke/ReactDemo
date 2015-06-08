 module Actions {
     export interface ISearchActionPayload extends IActionPayload {
         query: string;
     }

     export interface ISearchSuccessPayload extends IActionPayload {
         searchResult: Api.IConsultant[];
     }

     export class SearchActions {
         public static search(query: string) {
             var payload: ISearchActionPayload = {
                 actionType: ActionType.Search,
                 query: query
             };
             dispatcher.dispatch(payload);

             backend.search(query);
         }

         public static searchSuccess(searchResult: Api.IConsultant[]) {
             var payload: ISearchSuccessPayload = {
                 actionType: ActionType.SearchSuccess,
                 searchResult: searchResult
             };
             dispatcher.dispatch(payload);
         }

         public static searchError() {
             dispatcher.dispatch({ actionType: ActionType.SearchError });
         }
     }
 }