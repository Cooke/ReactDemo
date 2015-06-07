module Components {
    class ApplicationMain extends React.Component<any, any> {
        public render() {
            return (
                main({},
                    searchInput(),
                    searchResult()));
        }
    }

    export var applicationMain = React.createFactory(ApplicationMain);

}