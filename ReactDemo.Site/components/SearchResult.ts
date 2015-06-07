module Components {
    interface ISearchResultState {
        searchResult: Api.IConsultant[];
        isSearching: boolean;
        searchQuery: string;
    }

    class SearchResult extends React.Component<any, ISearchResultState> {
        constructor(props?: any, context?: any) {
            super(props, context);
            this.state = this.createState();
        }

        public componentDidMount() {
            searchStore.addChangeListener(this.handleSearchStoreChanged);
        }

        public componentWillUnmount() {
            searchStore.removeChangeListener(this.handleSearchStoreChanged);
        }

        public render() {
            return (
                this.state.searchQuery ?
                    section({ className: 'search-result' }, this.renderInnerContent()) :
                    null);
        }

        public renderInnerContent(): any {
            if (this.state.isSearching) {
                return progress();
            }

            if (this.state.searchResult.length === 0) {
                return 'No search hits';
            }

            return table({},
                tr({}, th({}, 'Name'), th({}, 'Skills')),
                this.state.searchResult.map(x => searchResultEntry({ key: x.name, person: x })));
        }

        private handleSearchStoreChanged = () => {
            this.setState(this.createState());
        };

        private createState() {
            return {
                searchResult: searchStore.getSearchResult(),
                isSearching: searchStore.isSearching(),
                searchQuery: searchStore.getSearchQuery()
            };
        }
    }

    export var searchResult = React.createFactory(SearchResult);
}