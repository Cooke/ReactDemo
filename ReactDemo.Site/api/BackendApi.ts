module Api {
    export class BackendApi {
        private baseUrl = 'http://localhost:61952/';

        public search(query: string) {
            setTimeout(() => {

                $.ajax({
                    url: this.baseUrl + 'api/consultants',
                    data: { query: query },
                    success: (result: IConsultant[]) => Actions.SearchActions.searchSuccess(result),
                    error: () => Actions.SearchActions.searchError()
                });
            }, 100);
        }
    }
}