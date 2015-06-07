/// <reference path="StoreBase.ts" />

module Stores {
    export class SearchStore extends StoreBase {
        private isCurrentlySearching: boolean;
        private searchResult: Api.IConsultant[];
        private searchQuery: string;

        public getSearchResult(): Api.IConsultant[] {
            return this.searchResult || [];
        }

        public isSearching() {
            return this.isCurrentlySearching;
        }

        public getSearchQuery(): string {
            return this.searchQuery;
        }

        protected handleAction(payload: Actions.IActionPayload): void {
            switch (payload.actionType) {
                case Actions.Types.Search:
                    var searchPayload = <Actions.ISearchActionPayload>payload;
                    this.isCurrentlySearching = true;
                    this.searchResult = null;
                    this.searchQuery = searchPayload.query;
                    this.notifyChange();
                    break;

                case Actions.Types.SearchError:
                    this.isCurrentlySearching = false;
                    this.notifyChange();
                    break;

                case Actions.Types.SearchSuccess:
                    var successPayload = <Actions.ISearchSuccssesfulPayload>payload;
                    this.isCurrentlySearching = false;
                    this.searchResult = successPayload.searchResult;
                    this.notifyChange();
                    break;
            }
        }
    }
}