module Components {
    interface ISearchResultProps {
        person: Api.IConsultant;
    }

    class SearchResultEntry extends React.Component<ISearchResultProps, any> {
        public render() {
            return (
                tr({ className: 'search-result-entry' },
                    td({}, this.props.person.name),
                    td({}, this.props.person.skills.join(', '))
                ));
        }
    }

    export var searchResultEntry = React.createFactory(SearchResultEntry);
}