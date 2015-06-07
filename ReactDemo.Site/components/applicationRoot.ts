module Components {
    class ApplicationRoot extends React.Component<any, any> {
        public render() {
            return (
                div({},
                    applicationHeader(),
                    applicationMain()));
        }
    }

    export var applicationRoot = React.createFactory(ApplicationRoot);
} 