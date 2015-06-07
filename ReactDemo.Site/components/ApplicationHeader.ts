module Components {
    class ApplicationHeader extends React.Component<any, any> {
        public render() {
            return (
                header({},
                    h1({}, "React Demo ", small({}, '- Skill Finder'))));
        }
    }

    export var applicationHeader = React.createFactory(ApplicationHeader);

}