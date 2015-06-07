module Components {
    interface ISearchInputState {
        searchQuery?: string;
        isSearching?: boolean;
    }

    class SearchInput extends React.Component<any, ISearchInputState> {
        constructor(props?: any, context?: any) {
            super(props, context);
            this.state = {};
        }

        public componentDidMount() {
            searchStore.addChangeListener(this.handleSearchStoreChanged);
            this.focusInputElement();
        }

        public componentWillUnmount() {
            searchStore.removeChangeListener(this.handleSearchStoreChanged);
        }

        public componentDidUpdate() {
            if (document.activeElement === document.body) {
                this.focusInputElement();
            }
        }

        public render() {
            return (
                form({ className: 'search-form', onSubmit: this.handleSearchFormSubmit },
                    input({
                        ref: 'SearchInput',
                        className: 'search-box',
                        placeholder: 'Search query',
                        onChange: this.handleSearchInputChanged,
                        disabled: this.state.isSearching
                    }),
                    button({
                        'type': 'submit',
                        className: 'search-button',
                        disabled: this.state.isSearching
                    }, 'Search')));
        }

        private handleSearchFormSubmit = (ev: React.FormEvent) => {
            ev.preventDefault();
            Actions.SearchActions.search(this.state.searchQuery);
        };

        private handleSearchInputChanged = (ev: React.FormEvent) => {
            var target = <any>ev.target;
            this.setState({ searchQuery: target.value });
        };

        private handleSearchStoreChanged = () => {
            this.setState({ isSearching: searchStore.isSearching() });
        };

        private focusInputElement() {
            var inputElement = React.findDOMNode<HTMLInputElement>(this.refs['SearchInput']);
            inputElement.setSelectionRange(0, inputElement.value.length);
            inputElement.focus();
        }
    }

    export var searchInput = React.createFactory(SearchInput);
}